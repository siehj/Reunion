require('dotenv').config();
const express = require('express');
const sessions = require('express-session');
const bodyParser = require('body-parser');
const router = require('./routes.js')
const io = require('socket.io');

const app = express();
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(sessions({secret: process.env.SECRET, resave: false, saveUninitialized: true }));

app.use('/', router);

const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`Listening on port ${port}`));



