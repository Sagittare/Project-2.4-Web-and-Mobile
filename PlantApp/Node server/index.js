const express = require('express');
const cors = require('cors');
const fs = require('fs'); 
const _ = require("lodash");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const jose = require("node-jose");

const expressJwt = require('express-jwt');
const mysql = require('mysql');
const { stringify } = require('querystring');

var userCounter = 3;
var plantCounter = 17;
var userplantsCounter = 3;

const initUsers = require('./users.json');
const initPlants = require('./plants.json');
const initUserplants = require('./userplants.json');

var users = initUsers;
var plants = initPlants;
var userplants = initUserplants;

const privateKey = fs.readFileSync('./private.pem', 'utf8');
const publicKey = fs.readFileSync('./public.pem', 'utf8');

const checkIfAuthenticated = expressJwt({
  secret: publicKey
});

const signOptions = {
  expiresIn: "30d",
  algorithm: 'ES256'
};

// Express
const app = express();
app.use(cors())

//parse usual forms
app.use(bodyParser.urlencoded({
  extended: true
}));

//parse json for APIs
app.use(bodyParser.json());

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "NodeServer",
//   password: "ServeryGoodness",
//   database: "plantenapp"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

app.get('/api', (req, res) => {
  console.log("Get received")
  res.json( {message: 'hallo allemaal...'} )
});

app.post('/api/login', function (req, res) {
  console.log("login post received");
  if (req.body.name && req.body.password) {
    const username = req.body.name;
    const password = req.body.password;

    var user = users[_.findIndex(users, { "username": username })];

    console.log(user.username + " - " + user.id)

    if (!user) {
      res.status(404).json({ message: 'no such user found' });
      console.log("no such user found");
    }
    else {
      if (user.password === password) {
      let payload = {"username": user.username, "id": user.id};
      let token = jwt.sign(payload, privateKey, signOptions);
      res.json({
        message: 'ok',
        token: token,
        expiresIn: jwt.decode(token).exp
      });
      console.log("expires: " + jwt.decode(token).exp);
      console.log("token sent");
      } else {
        res.status(406).json({ message: 'password did not match' });
        console.log("password did not match");
      }
    }
  }
});

app.post('/api/createUser', function (req, res) {
  console.log("create user post received")
  if (req.body.username && req.body.password) {
    const username = req.body.username;
    const password = req.body.password;

    users.push({"id": userCounter, "username": username, "password": password });
    userCounter++;
    console.log("user created")
    fs.writeFile('./users.json', JSON.stringify(users), (err) => {
      if (err) throw err;
      console.log('Data written to file');
    });
    users.forEach(item => {
      console.log(item);
    });
  }
});

app.post('/api/deleteUser', function (req, res) {
  console.log("delete user post received")
  if (req.body.token && req.body.username && req.body.password) {
    const username = req.body.username;
    const password = req.body.password;
    const token = req.body.token;

    jwt.verify(token, publicKey, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'jwt not valid' });
        console.log("jwt error");
      }
      else {
        let userIndex = _.findIndex(users, { "id": decoded.id });
        console.log("testing userdata against given data...")
        if(users[userIndex].username == username && users[userIndex].password == password ) {
          users.splice(userIndex, 1);
          console.log("user removed");
          fs.writeFile('./users.json', JSON.stringify(users), (err) => {
            if (err) throw err;
            console.log('Data written to file');
          });
        }
        else{
          res.status(406).json({ message: 'username or password incorrect' });
          console.log("username or password incorrect");
        }
      }
    });
  }
});

app.post('/api/editUsername', function (req, res) {
  console.log("edit username post received")
  if (req.body.token && req.body.username && req.body.password) {
    const username = req.body.username;
    const password = req.body.password;
    const token = req.body.token;

    console.log("decoded: " + stringify(jwt.decode(token)));
    jwt.verify(token, publicKey, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'jwt not valid' });
      }
      else {
        userID = decoded.id;
        
        userIndex = _.findIndex(users, { id: userID });
        var user = users[userIndex];
        console.log("user: " + stringify(user));

        if (!user) {
          res.status(404).json({ message: 'no such user found' });
        }
        else{
          if(user.password == password) {
            users[userIndex].username = username;
            console.log("username changed");
            fs.writeFile('./users.json', JSON.stringify(users), (err) => {
              if (err) throw err;
              console.log('Data written to file');
            });
          }
          else{
            res.status(406).json({ message: 'password incorrect' });
          }
        }
      }
    });
  }
});

app.post('/api/editPassword', function (req, res) {
  console.log("edit password post received");  
  if (req.body.token && req.body.password && req.body.newPassword) {
    const password = req.body.password;
    const newPassword = req.body.newPassword;
    const token = req.body.token;

    console.log("decoded: " + stringify(jwt.decode(token)));
    jwt.verify(token, publicKey, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'jwt not valid' });
         console.log("jwt not valid!");
      }
      else {
        userIndex = _.findIndex(users, { id: decoded.id });
        var user = users[userIndex];
        console.log("user: " + stringify(user));

        if (!user) {
          res.status(404).json({ message: 'no such user found' });
        }
        else{
          if(user.password == password) {
            users[userIndex].password = newPassword;
            console.log("password changed")
            fs.writeFile('./users.json', JSON.stringify(users), (err) => {
              if (err) throw err;
              console.log('Data written to file');
            });
          }
          else{
            res.status(406).json({ message: 'password incorrect' });
          }
        }
      }
    });
  }
  else {
    console.log("data not present");
  }
});

app.post('/api/getUserPlants', function (req, res) {
  console.log("get user plants post received");
  
  if (req.body.token) {
    const token = req.body.token;
    console.log(stringify(jwt.decode(token)));

    jwt.verify(token, publicKey, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'jwt not valid' });
        console.log("jwt error");
      }
      else {
        let plantlist = new Array();
        userplants.forEach((item) => {
          if(item.userID == decoded.id) {
            plantlist.push(item);
          }
        });
        console.log("sending list back...");
        res.json(plantlist);
      }
    });
  }
  else{
    console.log("no token");
  }
});

app.post('/api/getPlantInformation', function (req, res) {
  if (req.body.plantID) {
    const plantID = req.body.plantID;
    for(let i = 0; i < plants.length; i++){
      if(plants[i].plantID == plantID) {
        res.json(plants[i]);
        break;
      }
    }
  }
});

  // console.log("get plant info post received")
          // console.log("plantID found: " + plantID + " returning...");

app.get('/api/getPlantList', function (req, res) {
  res.json(plants);
});

  // console.log("get plant list get received")

app.post('/api/addPlant', function (req, res) {
  console.log("add plant post received");
  if (req.body.token && req.body.plantName && req.body.description && req.body.notificationFrequency && req.body.waterAmount && req.body.minTemp && req.body.maxTemp) {
    const plantName = req.body.plantName;
    const description = req.body.description;
    const notificationFrequency = parseInt(req.body.notificationFrequency);
    const waterAmount = req.body.waterAmount;
    const token = req.body.token;
    let minTemp = null;
    let maxTemp = null;
    if(req.body.minTemp.length > 0) {
      minTemp = parseInt(req.body.minTemp);
    }
    if(req.body.maxTemp.length > 0) {
      maxTemp = parseInt(req.body.maxTemp);
    }

    jwt.verify(token, publicKey, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'jwt not valid' });
      }
      else {
        plants.push({"id": plantCounter, "plantName": plantName, "description": description, "notificationFrequency": notificationFrequency, "waterAmount": waterAmount, "minTemp": minTemp, "maxTemp": maxTemp})
        plantCounter++
        console.log("plant added");
        fs.writeFile('./plants.json', JSON.stringify(plants), (err) => {
          if (err) throw err;
          console.log('Data written to file');
        });
      }
    });
  }
});

app.post('/api/setUserPlant', function (req, res) {
  console.log("set user plant post received")  
  if (req.body.token && req.body.plantID) {
    const plantID = parseInt(req.body.plantID);
    const token = req.body.token;
    const plantName = "";
    const description = "";
    if(req.body.plantName) {
      plantName = req.body.plantName
    }
    if(req.body.description) {
      description = req.body.description
    }

    jwt.verify(token, publicKey, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'jwt not valid' });
        console.log("jwt error");
      }
      else {
        userplants.push({"uniqueID": userplantsCounter, "plantID": plantID, "userID": decoded.id, "descriptionOverride": description, "nameOverride": plantName, "alive": 1})
        userplantsCounter++
        console.log("plant added to user");
        fs.writeFile('./userplants.json', JSON.stringify(userplants), (err) => {
          if (err) throw err;
          console.log('Data written to file');
        });
      }
    });
  }
});

app.post('/api/removeUserPlant', function (req, res) {
  console.log("remove user plant post received")
  if (req.body.token && req.body.uniqueID) {
    const uniqueID = req.body.uniqueID;
    const token = req.body.token;

    jwt.verify(token, publicKey, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'jwt not valid' });
      }
      else {
        plantIndex = _.findIndex(userplants, { uniqueID: parseInt(uniqueID) });
        userplants.splice(plantIndex, 1);
        console.log("userplant removed");
        fs.writeFile('./userplants.json', JSON.stringify(userplants), (err) => {
          if (err) throw err;
          console.log('Data written to file');
        });
      }
    });
  }
});

// app.route('/api/secret')
//   .get(checkIfAuthenticated, function (req, res) {
//     res.json({ message: "Success! You can not see this without a token" });
//   })

const PORT = process.env.PORT || 1337;

app.listen(PORT, function () {
  console.log("Express starting listening on port "+PORT)
  console.log("Express running")
});
