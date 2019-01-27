const db = require('../index.js');
const profile = require('../Queries/ProfileQueries');

module.exports = {
  'addUser' : (user) => {
    let { username, password, name } = user;
    const query = `INSERT into users (username, password, name, vote) VALUES ($1, $2, $3, 1);`;
    const params = [username, password, name];
    return new Promise ((resolve, reject) => {
      db.query(query, params, (err, data) => {
        if (err) reject(err);
        else {
          profile.getUserInfo(username, (err, data) => {
            if (err) reject(err);
            else resolve(data);
          })
        };
      });
    });
  },
  'checkUsername' : (username) => {
    const query = 'SELECT EXISTS (SELECT 1 FROM users WHERE username=$1);';
    const params = [username];
    return new Promise ((resolve, reject) => {
      db.query(query, params, (err, { rows }) => {
        if (err) reject(err);
        else resolve(rows[0].exists);
      })
    });
  },
  'findUser' : (username) => {
    const query = 'SELECT EXISTS (SELECT 1 FROM users WHERE username=$1);';
    const params = [username];
    return new Promise ((resolve, reject) => {
  
      db.query(query, params, (err) => {
        if (err) reject(err);
        profile.getUserInfo(username, (err, data) => {
          if (err) reject(err);
          else resolve(data[0]);
        })
      });   
    })
  },
};