const { Client } = require('pg');

const client = new Client(process.env.DB_Connection + '?ssl=true');
client.connect();

module.exports = {};