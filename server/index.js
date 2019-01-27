require('dotenv').config();
const express = require('express');
const sessions = require('express-session');
const bodyParser = require('body-parser');
const db = require('../database/');
const helper = require('../services/yelp');
const router = require('./routes.js')
const io = require('socket.io');

const app = express();
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(sessions({secret: process.env.SECRET, resave: false, saveUninitialized: true }));

app.use('/', router);


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



