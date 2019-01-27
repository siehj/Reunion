const { Client } = require('pg');

const client = new Client(process.env.DATABASE_URL + '?ssl=true');
client.connect(err => err ? console.log(err) : console.log('connected successfully to db!'));

module.exports = client;
