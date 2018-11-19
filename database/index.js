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

const findUser = (username) => {
  const query = 'SELECT EXISTS (SELECT 1 FROM users WHERE username=$1);';
  const params = [username];
  return new Promise ((resolve, reject) => {

    client.query(query, params, (err) => {
      if (err) reject(err);
      getUserInfo(username, (err, data) => {
        if (err) reject(err);
        else resolve(data[0]);
      })
    });   
  })
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