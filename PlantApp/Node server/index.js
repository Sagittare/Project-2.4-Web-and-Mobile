const express = require('express');
const cors = require('cors');
const fs = require('fs'); 
const _ = require("lodash");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const expressJwt = require('express-jwt');

const users = [
  { id: 1, name: 'bart', password: 'henker' },
  { id: 2, name: 'test', password: 'test' }
];

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

app.get('/api', (req, res) => {
  console.log("Get received")
  res.json( {message: 'hallo allemaal...'} )
});

app.post('/api/login', function (req, res) {
  console.log("Credentials POST.")
  if (req.body.name && req.body.password) {
    var name = req.body.name;
  }
  res.json( {message: 'hallo users...'} )

  var user = users[_.findIndex(users, { name: name })];

  if (!user) {
    res.status(404).json({ message: 'no such user found' });
  }

  if (user.password === req.body.password) {
    let payload = { name, id: user.id };
    let token = jwt.sign(payload, privateKey, signOptions);
    res.json({
      message: 'ok',
      token: token,
      expiresIn: jwt.decode(token).exp
    });
    console.log("Token generated.")
  } else {
    res.status(401).json({ message: 'password did not match' });
  }
});

app.post('/api/createUser', function (req, res) {
  if (req.body.username && req.body.password && req.body.first && req.body.middle && req.body.last && req.body.email) {
   const username = req.body.username;
   const password = req.body.password;
   const first = req.body.first;
   const middle = req.body.middle;
   const last = req.body.last;
   const email = req.body.email;
  }

  if (/*SQL success*/ username == "test"/*<- just to prevent error*/) {
    //show success
  } else {
    res.status(401).json({ message: 'SQL failure' });
  }
});

app.post('/api/deleteUser', function (req, res) {
  if (req.body.username && req.body.password && req.body.email) {
   const username = req.body.username;
   const password = req.body.password;
   const email = req.body.email;
  }

  if (/*SQL success*/ username == "test"/*<- just to prevent error*/) {
    //show success
  } else {
    res.status(401).json({ message: 'SQL failure' });
  }
});

app.post('/api/getUserData', function (req, res) {
  //maybe change to use token. not sure how to identify current user with jwt.
  if (req.body.username && req.body.password) {
   const username = req.body.username;
   const password = req.body.password;
  }

  if (/*SQL success*/ username == "test"/*<- just to prevent error*/) {
    res.json(/*JSON-ified SQL reply*/)
  } else {
    res.status(401).json({ message: 'SQL failure' });
  }
});

app.post('/api/editUserData', function (req, res) {
  //maybe change to use token. not sure how to identify current user with jwt.
  if (req.body.username && req.body.password) {
   const username = req.body.username;
   const password = req.body.password;
  }

  if (/*SQL success*/ username == "test"/*<- just to prevent error*/) {
    res.json(/*JSON-ified SQL reply*/)
  } else {
    res.status(401).json({ message: 'SQL failure' });
  }
});

app.post('/api/getUserPlants', function (req, res) {
  //maybe change to use token. not sure how to identify current user with jwt.
  if (req.body.username && req.body.password) {
   const username = req.body.username;
   const password = req.body.password;
  }

  if (/*SQL success*/ username == "test"/*<- just to prevent error*/) {
    res.json(/*JSON-ified SQL reply*/)
  } else {
    res.status(401).json({ message: 'SQL failure' });
  }
});

app.post('/api/getPlantInformation', function (req, res) {
  //maybe change to use token. not sure how to identify current user with jwt.
  if (req.body.username && req.body.password) {
   const username = req.body.username;
   const password = req.body.password;
  }

  if (/*SQL success*/ username == "test"/*<- just to prevent error*/) {
    res.json(/*JSON-ified SQL reply*/)
  } else {
    res.status(401).json({ message: 'SQL failure' });
  }
});

app.post('/api/editUserData', function (req, res) {
  //maybe change to use token. not sure how to identify current user with jwt.
  if (req.body.username && req.body.password) {
   const username = req.body.username;
   const password = req.body.password;
  }

  if (/*SQL success*/ username == "test"/*<- just to prevent error*/) {
    res.json(/*JSON-ified SQL reply*/)
  } else {
    res.status(401).json({ message: 'SQL failure' });
  }
});

app.post('/api/addPlant', function (req, res) {
  //maybe change to use token. not sure how to identify current user with jwt.
  if (req.body.username && req.body.password) {
   const username = req.body.username;
   const password = req.body.password;
  }

  if (/*SQL success*/ username == "test"/*<- just to prevent error*/) {
    res.json({message: 'Success'})
  } else {
    res.status(401).json({ message: 'SQL failure' });
  }
});

app.post('/api/setUserPlant', function (req, res) {
  //maybe change to use token. not sure how to identify current user with jwt.
  if (req.body.username && req.body.password) {
   const username = req.body.username;
   const password = req.body.password;
  }

  if (/*SQL success*/ username == "test"/*<- just to prevent error*/) {
    res.json(/*JSON-ified SQL reply*/)
  } else {
    res.status(401).json({ message: 'SQL failure' });
  }
});

app.post('/api/removeUserPlant', function (req, res) {
  //maybe change to use token. not sure how to identify current user with jwt.
  if (req.body.username && req.body.password) {
   const username = req.body.username;
   const password = req.body.password;
  }

  if (/*SQL success*/ username == "test"/*<- just to prevent error*/) {
    res.json({message: 'Success'})
  } else {
    res.status(401).json({ message: 'SQL failure' });
  }
});

app.route('/api/secret')
  .get(checkIfAuthenticated, function (req, res) {
    res.json({ message: "Success! You can not see this without a token" });
  })

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log("Express starting listening on port "+PORT)
  console.log("Express running")
});
