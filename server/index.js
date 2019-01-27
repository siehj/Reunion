require('dotenv').config();
const express = require('express');
const sessions = require('express-session');
const bodyParser = require('body-parser');
const db = require('../database/');
const router = require('./routes.js')
const io = require('socket.io');

const app = express();
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(sessions({secret: process.env.SECRET, resave: false, saveUninitialized: true }));

app.use('/', router);

app.get('/db/hotelInfo', (req, res) => {
  db.getAllHotelInfo()
    .then(result => res.send(result))
    .catch(err => console.log('Error getting hotel content from the db', err));
});

app.post('/api/sendUserUpdate', );

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


const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`Listening on port ${port}`));



