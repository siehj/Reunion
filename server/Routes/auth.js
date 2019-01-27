const db = require('../../database/Queries/AuthQueries');
const sessions = require('express-session');
const bcrypt = require('bcrypt-nodejs');


module.exports = {
  'login' : (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if ( !username.length || !password.length ) {
      res.send(["login", "Either the username or password is missing"]);
    } 
    db.findUser(username)
      .then(user => {
        if(!user) {
          res.send(["login", "Sorry, your login and or password are incorrect!"]);
        } else {
          return user;
        }
      })
      .then(user => { 
        bcrypt.compare(password, user.password, (err, match) => {
          if (err || !match) {
            res.send(["login", "Sorry, your login and or password are incorrect!"]);
          } else {
            req.session.loggedIn = true;
            let userInfo = { id: user.id, name: user.name, email: user.email, phone: user.phone, vote: user.vote, city: user.city, state: user.state };
            res.send(userInfo);                  
          }
        })
      })
      .catch(err => console.log(err))
  },
  'signup' : (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let name = `${req.body.firstName} ${req.body.lastName}`;
    
    if ( !username.length || !password.length ) {
      console.log("error");
      res.send(["signUp", "Either the username or password is missing"]);
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, null, (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          // check if username is taken in the db
          db.checkUsername(username)
            .then(result => {
              if (result) res.send(["signUp", "Sorry, this username is already taken"]);
              else return; 
            })
            .then(() => {
              let user = { username: username, password: hash, name: name };
              db.addUser(user)
                .then((newUser) => {
                  let userInfo = { id: newUser[0].id, name: newUser[0].name, email: newUser[0].email, phone: newUser[0].phone, vote: newUser[0].vote };
                  res.send(userInfo);
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        }
      })
    })
  },

  'logout' : (req, res) => {
    req.session.loggedIn = false;
    res.end();
  }
}