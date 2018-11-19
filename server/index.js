require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sessions = require('express-session');
const bcrypt = require('bcrypt-nodejs');
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
  }
  // else find the user in the db with username 
    //bcrypt.compare(password, pwfromDb (err, match) => {})

      //req.session.loggedIn = true;
  res.end();
})

app.post('/api/signUp', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if ( !username.length || !password.length ) {
    console.log("error");
    res.send(["signUp", "Either the username or password is missing"]);
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.log(err);
    } else {
      // check if username is taken in the db

      //if found, 
        //send back error ["signUp", "Sorry, you cannot use this username"]

      //else, 
        //place into the database
        //req.session.loggedIn = true;
      res.end();
    }
  })
  // res.end();
})

const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`Listening on port ${port}`));



