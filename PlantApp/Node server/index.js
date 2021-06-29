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

var users = [
  { id: 1, username: 'bart', password: 'henker' },
  { id: 2, username: 'test', password: 'test' }
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

var con = mysql.createConnection({
  host: "localhost",
  user: "NodeServer",
  password: "ServeryGoodness",
  database: "plantenapp"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/api', (req, res) => {
  console.log("Get received")
  res.json( {message: 'hallo allemaal...'} )
});

app.post('/api/login', function (req, res) {
  console.log("login post received")
  if (req.body.name && req.body.password) {
    const username = req.body.name;
    const password = req.body.password;

  //   let userPassword;
  //   let userID;

  //   con.query("SELECT EXISTS ( SELECT AccountNaam FROM user WHERE AccountNaam = '" + username + "');", function (err, result, fields) {
  //     console.log("stringify exists query: " + stringify(result))
  //     if(result == 0) {
  //       console.log("no user found");
  //       res.status(406).json({ message: 'no such user found' });
  //     }
  //     else if (err) {
  //       console.log("error in sql!");
  //       res.status(500).json({ message: 'error during user lookup' });
  //     }
  //     else {
  //       con.query("SELECT UserID FROM user WHERE AccountNaam = '" + username + "';", function (err, result, fields) {
  //         userID = result.UserID;
  //         console.log("userID login: " + userID + " - " + stringify(result))
  //         if (err) {
  //           console.log("error selecting userID")
  //           res.status(500).json({ message: 'failed to collect user id' });
  //         }
  //       });
  //       console.log("select time!");
  //       con.query("SELECT Wachtwoord FROM user WHERE AccountNaam = '" + username + "';", function (err, result, fields) {
  //         userPassword = result[0].Wachtwoord;
  //         if (err) {
  //           console.log("error selecting password")
  //           res.status(500).json({ message: 'failed to collect password' });
  //         }

  //         console.log(userPassword)
  //         console.log(password)
  //         if (userPassword === password) {
  //           let payload = { name: username, id: userID};
  //           let token = jwt.sign(payload, privateKey, signOptions);
  //           res.json({
  //             message: 'ok',
  //             token: token,
  //             expiresIn: jwt.decode(token).exp
  //           });
  //           console.log("token sent: " + token);
  //           console.log("token info: " + jwt.decode(token));
  //           console.log("token id: " + jwt.decode(token).payload);
  //         } else {
  //           console.log("password did not match")
  //           //res.status(406).json({ message: 'password did not match' });
  //         }
  //       });
  //     }
  //   });
  // }
  //});
    var user = users[_.findIndex(users, { username: username })];

    if (!user) {
      res.status(404).json({ message: 'no such user found' });
    }
    else {
      if (user.password === password) {
      let payload = { username: user.username, id: user.id};
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
      }
    }
  }
});

app.post('/api/createUser', function (req, res) {
  console.log("create user post received")
  if (req.body.username && req.body.password) {
    const username = req.body.username;
    const password = req.body.password;
    con.query("INSERT INTO user (AccountNaam, Wachtwoord, Admin) VALUES ('" + username + ", " + password + ", 0');"), function (err) {
      if (err) {
        res.status(500).json({ message: 'SQL failure' });
      }
      else {
        res.json({message: 'user created'})
      }
    }
  }
});

app.post('/api/deleteUser', function (req, res) {
  console.log("delete user post received")
  if (req.body.token && req.body.username && req.body.password) {
    const username = req.body.username;
    const password = req.body.password;
    const token = req.body.token;

    jwt.verify(token, privateKey, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'jwt not valid' });
      }
      else {
        deleteUser(username, password, decoded.id);
      }
    });
  }
});

// function deleteUser(username, password, userID) {
//   con.query("SELECT EXISTS (SELECT UserID FROM user WHERE UserID = '" + userID + "');"), function (err, result) {
//     if(result == 0) {
//       res.status(406).json({ message: 'no such user found' });
//     }
//     else if (err) {
//       res.status(500).json({ message: 'error during user lookup' });
//     }
//     else {
//       con.query("SELECT Wachtwoord FROM user WHERE UserID = '" + userID + "';"), function (err, result) {
//         userPassword = result;
//         if (err) {
//           res.status(500).json({ message: 'failed to collect password' });
//         }
//       }
//     }
//   }

//   if (userPassword === password) {
//     con.query("DELETE FROM customers WHERE AccountNaam = '" + username + "';"), function (err) {
//       if (err) {
//         res.status(500).json({ message: 'failed to delete user with name: ' + username });
//       }
//       else {
//         res.json({message: 'user deleted'})
//       }
//     }
//   }
//   else {
//     res.status(406).json({ message: 'no such user found' });
//   }
// }

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
        console.log("user:" + stringify(user));

        if (!user) {
          res.status(404).json({ message: 'no such user found' });
        }
        else{
          if(user.password == password) {
            users[userIndex].username = username;
            console.log("username changed")
          }
          else{
            res.status(406).json({ message: 'password incorrect' });
          }
        }

        //editUserName(username, password, decoded.id);
      }
    });
  }
});

// function editUserName(username, password, userID) {
//   con.query("SELECT EXISTS (SELECT UserID FROM user WHERE UserID = '" + userID + "');"), function (err, result) {
//     if(result == 0) {
//       res.status(406).json({ message: 'no such user found' });
//     }
//     else if (err) {
//       res.status(500).json({ message: 'error during user lookup' });
//     }
//     else {
//       con.query("SELECT Wachtwoord FROM user WHERE UserID = '" + userID + "';"), function (err, result) {
//         userPassword = result;
//         if (err) {
//           res.status(500).json({ message: 'failed to collect password' });
//         }
//       }
//       if (userPassword === password) {
//         con.query("UPDATE user SET Accountnaam = " + username + "  WHERE UserID = '" + id + "';"), function (err) {
//           if (err) {
//             res.status(500).json({ message: 'failed to set username' });
//           }
//         }
//       }
//     }
//   }
// }

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
        userID = decoded.id;
        userIndex = _.findIndex(users, { id: userID });
        var user = users[userIndex];
        console.log("user:" + stringify(user));

        if (!user) {
          res.status(404).json({ message: 'no such user found' });
        }
        else{
          if(user.password == password) {
            users[userIndex].password = newPassword;
            console.log("password changed")
          }
          else{
            res.status(406).json({ message: 'password incorrect' });
          }
        }
        // editUserPassword(password, newPassword, decoded.id, res);
      }
    });
  }
  else {
    console.log("data not present");
  }
});

// function editUserPassword(password, newPassword, userID, res) {
//   con.query("SELECT 1 FROM user WHERE EXISTS (SELECT 1 FROM user WHERE UserID = '" + userID + "');", function (err, result) {
//     console.log("query 1 result: " + result);
//     if(result == 0) {
//       //res.status(406).json({ message: 'no such user found' });
//       console.log("no user found");
//     }
//     else if (err) {
//       //res.status(500).json({ message: 'error during user lookup' });
//       console.log("error during user lookup");
//     }
//     else {
//       let userPassword;
//       con.query("SELECT Wachtwoord FROM user WHERE UserID = '" + userID + "';", function (err, result) {
//         userPassword = result;
//         console.log("userpassword: " + userPassword);
//         if (err) {
//           res.status(500).json({ message: 'failed to collect password' });
//         }
//       });
//       if (userPassword === password) {
//         con.query("UPDATE user SET Wachtwoord = " + newPassword + "  WHERE UserID = '" + userID + "';", function (err) {
//           console.log("updating password to: " + newpassword);
//           if (err) {
//             res.status(500).json({ message: 'failed to set password' });
//           }
//         });
//       }
//     }
//   });
// }

app.post('/api/getUserPlants', function (req, res) {
  console.log("get user plants post received")
  if (req.body.token) {
    const token = req.body.token;

    jwt.verify(token, privateKey, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'jwt not valid' });
      }
      else {
        getUserPlants(decoded.id);
      }
    });
  }
});

function getUserPlants(userID) {
  con.query("SELECT EXISTS (SELECT UserID FROM userplants WHERE UserID = '" + userID + "');"), function (err, result) {
    if(result == 0) {
      res.json({ message: 'this user has no plants yet' });
    }
    else if (err) {
      res.status(500).json({ message: 'error during userplants lookup' });
    }
    else {
      con.query("SELECT JSON_ARRAYAGG (JSON_OBJECT ('UniqueID', UniqueID, 'PlantID', PlantID, 'UserID', UserID, 'DiscriptionOverride', DiscriptionOverride,'NameOverride', NameOverride, 'Alive', Alive)) FROM userplants WHERE UserID = '" + userID + "';"), function (err, result) {
        res.json(result);
        if (err) {
          res.status(500).json({ message: 'failed to collect plants' });
        }
      }
    }
  }
}

app.post('/api/getPlantInformation', function (req, res) {
  console.log("get plant info post received")
  if (req.body.plantID) {
    const plantID = req.body.plantID;
    
    con.query("SELECT EXISTS (SELECT PlantID FROM plants WHERE PlantID = '" + plantID + "');"), function (err, result) {
      if(result == 0) {
        res.status(406).json({ message: 'this plant does not exist in the database' });
      }
      else if (err) {
        res.status(500).json({ message: 'error during plant lookup' });
      }
      else {
        con.query("SELECT JSON_OBJECT('PlantID', PlantID, 'Name', Name, 'Description', Description, 'NotificationFrequency', NotificationFrequency, 'WaterAmount', Wateramount, 'minTemp' , minTemp, 'maxTemp', maxTemp) FROM plants WHERE PlantID = '" + plantID + "';"), function (err, result) {
          res.json(result);
          if (err) {
            res.status(500).json({ message: 'failed to collect plants' });
          }
        }
      }
    }
  }
});

app.post('/api/addPlant', function (req, res) {
  console.log("add plant post received")
  if (req.body.token && req.body.plantName && req.body.description && req.body.notificationFrequency && req.body.waterAmount) {
    const plantName = req.body.plantName;
    const description = req.body.description;
    const notificationFrequency = req.body.notificationFrequency;
    const waterAmount = req.body.waterAmount;
    const token = req.body.token;

    jwt.verify(token, privateKey, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'jwt not valid' });
      }
      else {
        addPlant(plantName, description, notificationFrequency, waterAmount);
      }
    });
  }
});

function addPlant(plantName, description, notificationFrequency, waterAmount) {
  con.query("INSERT INTO plants (Name, Description, NotificationFrequency, WaterAmount) VALUES (" + plantName + ", " + description + ", " + notificationFrequency + ", " + waterAmount + ");"), function (err) {
    if (err) {
      res.status(500).json({ message: 'error inserting plant into database' });
    }
    else {
      res.json({message: 'plant added to database'})
    }
  }
}

app.post('/api/setUserPlant', function (req, res) {
  console.log("set user plant post received")  
  if (req.body.token && req.body.plantID) {
    const plantID = req.body.plantID;
    const description = req.body.description;
    const plantName = req.body.plantName;
    const token = req.body.token;

    jwt.verify(token, privateKey, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'jwt not valid' });
      }
      else {
        setUserPlant(plantID, decoded.id, description, plantName);
      }
    });
  }
});

function setUserPlant(plantID, userID, description, plantName) {
  con.query("SELECT EXISTS (SELECT PlantID FROM plants WHERE PlantID = '" + plantID + "');"), function (err, result) {
    if(result == 0) {
      res.status(406).json({ message: 'this plant does not exist' });
    }
    else if (err) {
      res.status(500).json({ message: 'error during plant lookup' });
    }
    else {
      con.query("INSERT INTO plants (PlantID, UserID, DescriptionOverride, NameOverride, Alive) VALUES (" + plantID + ", " + userID + ", " + description + ", " + plantName + ", 1);"), function (err) {
        if (err) {
          res.status(500).json({ message: 'failed to collect plants' });
        }
        else {
          res.json({message: 'plant added to user'})
        }
      }
    }
  }
}

app.post('/api/removeUserPlant', function (req, res) {
  console.log("remove user plant post received")
  if (req.body.token && req.body.uniqueID) {
    const uniqueID = req.body.uniqueID;
    const token = req.body.token;

    jwt.verify(token, privateKey, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'jwt not valid' });
      }
      else {
        removeUserPlant(uniqueID, decoded.id);
      }
    });
  }
});

function removeUserPlant(uniqueID, userID) {
  con.query("SELECT EXISTS (SELECT UniqueID FROM userplants WHERE UniqueID = '" + uniqueID + "');"), function (err, result) {
    if(result == 0) {
      res.status(406).json({ message: 'this plant does not exist' });
    }
    else if (err) {
      res.status(500).json({ message: 'error during userplant lookup' });
    }
    else {
      con.query("SELECT UserID FROM userplants WHERE UniqueID = '" + uniqueID + "');"), function (err, result) {
        if(result == userID) {
          con.query("DELETE FROM userplants WHERE UniqueID = '" + uniqueID + "';"), function (err) {
            if (err) {
              res.status(500).json({ message: 'error during userplant removal' });
            }
            else {
              res.json({ message: 'plant deleted from user' });
            }
          }
        }
        else if (err) {
          res.status(500).json({ message: 'error during userplant lookup' });
        }
        else {
          res.status(401).json({ message: 'this plant does not belong to this user' });
        }
      }
    }
  }
}

app.route('/api/secret')
  .get(checkIfAuthenticated, function (req, res) {
    res.json({ message: "Success! You can not see this without a token" });
  })

const PORT = process.env.PORT || 1337;

app.listen(PORT, function () {
  console.log("Express starting listening on port "+PORT)
  console.log("Express running")
});
