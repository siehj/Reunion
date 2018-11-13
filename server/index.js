const express = require('express');
const bodyParser = require('body-parser');
const io = require('socket.io');

const app = express();
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/login', (req, res) => {
  console.log(req.body);
})

app.post('/api/signUp', (req, res) => {
  console.log(req.body);
})

const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`Listening on port ${port}`));



