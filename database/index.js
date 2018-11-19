const { Client } = require('pg');

const client = new Client(process.env.DB_Connection + '?ssl=true');
client.connect();

const addUser = (user, callback) => {
  let { username, password, name } = user;
  const query = `INSERT into users (username, password, name, vote) VALUES ($1, $2, $3, 1);`;
  const params = [username, password, name];
  client.query(query, params, (err, data) => {
    if (err) callback(err, null);
    else {
      getUserInfo(username, (err, data) => {
        if (err) callback(err, null);
        else callback(null, data);
      })
    };
  });
};

const findUser = (username, callback) => {
  const query = 'SELECT EXISTS (SELECT 1 FROM users WHERE username=$1);';
  const params = [username];
  client.query(query, params, (err, { rows }) => {
    if (err) callback(err, null);
    else callback(null, rows);
  });
};

getUserInfo = (username, callback) => {
  const query = 'SELECT * FROM users WHERE username=$1;';
  const params = [username];
  client.query(query, params, (err, { rows }) => {
    if(err) callback(err, null);
    else callback(null, rows);
  });
}

const showUsers = (callback) => {
  const query = 'SELECT * FROM users;';
  client.query(query, (err, { rows }) => {
    if(err) callback(err, null);
    else callback(null, rows);
  });
}

module.exports = { findUser, addUser, showUsers, getUserInfo };