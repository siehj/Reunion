require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sessions = require('express-session');
const bcrypt = require('bcrypt-nodejs');
var db = require('../database/');
const io = require('socket.io');

const app = express();
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(sessions({secret: process.env.SECRET, resave: false, saveUninitialized: true }));

app.post('/api/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if ( !username.length || !password.length ) {
    res.send(["login", "Either the username or password is missing"]);
  } else {
    db.findUser(username, (err, result) => { 
      if (err) {
        console.log('err', err) 
      } else {
        if(!result[0].exists) {
          res.send(["login", "Sorry, your login and or password are incorrect!"]);
        } else {
          // else find the user in the db with username 
          db.getUserInfo(username, (err, info) => {
            if(err) console.log(err);
            else {
              bcrypt.compare(password, info[0].password, (err, match) => {
                if (err || !match) {
                  res.send(["login", "Sorry, your login and or password are incorrect!"]);
                } else {
                  req.session.loggedIn = true;
                  let userInfo = { name: info[0].name.split(' ')[0], email: info[0].email, phone: info[0].phone, vote: info[0].vote };
                  res.send(userInfo);                  
                }
              })
            }
          });
        }
      } 
    });
  }
  // res.end();
})

app.post('/api/signUp', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let name = `${req.body.firstName} ${req.body.lastName}`;
  
  if ( !username.length || !password.length ) {
    console.log("error");
    res.send(["signUp", "Either the username or password is missing"]);
  } else {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, null, (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          // check if username is taken in the db
          db.findUser(username, (err, result) => {
            if (err) console.log(`error finding user`);
            else {
              if (result[0].exists) {
                res.send(["signUp", "Sorry, this username is already taken"]);
              } else {
                let user = { username: username, password: hash, name: name };
                // console.log(user); 
                //place into the database
                db.addUser(user, (err, data) => {
                  if (err) console.log(err);
                  else {
                    console.log(data);
                    req.session.loggedIn = true;
                    res.end();
                  }
                });
              }
            } 
          });
          
        }
      })
    })
  }
  // res.end();
})

const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`Listening on port ${port}`));



