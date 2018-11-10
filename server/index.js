const express = require('express');
const bodyParser = require('body-parser');
const io = require('socket.io');

const app = express();
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));



