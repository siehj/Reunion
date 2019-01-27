require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sessions = require('express-session');
const bcrypt = require('bcrypt-nodejs');
const db = require('../database/');
const helper = require('../services/yelp');
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
});


app.post('/api/signUp', (req, res) => {
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
});

app.post('/api/searchYelp', (req, res) => {
  // console.log(req.body.query);
  helper.yelpApi(req.body.query)
    .then(({ businesses }) => res.send(businesses))
    .catch(err => console.log('err with server-side search', err));
});

app.get('/db/hotelInfo', (req, res) => {
  db.getAllHotelInfo()
    .then(result => res.send(result))
    .catch(err => console.log('Error getting hotel content from the db', err));
});

app.post('/api/sendUserUpdate', (req, res) => {
  let updatedInfo = req.body;
  let id = updatedInfo.id;
  delete updatedInfo.id;

  db.updateUser(id, updatedInfo)
    .then(() => {
      db.getWithId(id)
        .then(({ rows }) => {
          return rows[0];
        })
        .then(userInfo => res.send(userInfo))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

app.get('/api/getAllVotingTopics', (req, res) => {
  // let shaped = [];
  // db.getAllVotingTopics()
  //   .then(rows => {
  //     rows.forEach(topic => {
  //       db.getVotingItemsByTopic(topic.id)
  //       //   , (err, {rows}) => {
  //       //   if(err) console.log(err);
  //       //   else {
  //       //     if(rows.every((el) => el.location !== null)) {
  //       //       topic.options = rows;
  //       //       shaped.push(topic);
  //       //     } else {
  //       //       let obj = {};
  //       //       rows.map(option => {
  //       //         obj[option.name] = option;
  //       //       });
  //       //       topic.options = obj;
  //       //       shaped.push(topic);
  //       //     }
            
  //       //   }
  //       // }
  //       // )
  //       .then(() => {
  //         if(rows.every((el) => el.location !== null)) {
  //           topic.options = rows;
  //           shaped.push(topic);
  //         } else {
  //           let obj = {};
  //           rows.map(option => {
  //             obj[option.name] = option;
  //           });
  //           topic.options = obj;
  //           shaped.push(topic);
  //         }
  //       })
  //       .then(() => {return shaped;})
  //       .catch(err => console.log(err));
  //     })
  //   })
  //   .then((data) => console.log(data))
  //   .catch(err => console.log(err));
  db.getVoting()
    .then(result => res.send(result))
});

app.post('/api/castVote', (req, res) => {

});

app.post('/api/logout', (req, res) => {
  req.session.loggedIn = false;
  res.end();
});


const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`Listening on port ${port}`));



