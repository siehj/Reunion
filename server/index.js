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
   db.findUser(username, (err, result) => { err ? console.log('err', err) : console.log(result[0].exists) });
    // else find the user in the db with username 
    //bcrypt.compare(password, pwfromDb (err, match) => {})
    
    //req.session.loggedIn = true;
  }
  res.end();
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
      if (err) {
        console.log(err);
      } else {
        // check if username is taken in the db
        // console.log(db.findUser())
        //if found, 
        //send back error ["signUp", "Sorry, you cannot use this username"]
        
        //else, 
        let user = { username: username, password: salt, name: name };
        console.log(user); 
        //place into the database
        //req.session.loggedIn = true;
        res.end();
      }
    })
  }
  // res.end();
})

const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`Listening on port ${port}`));



