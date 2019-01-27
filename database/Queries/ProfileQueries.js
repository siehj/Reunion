const db = require('../index');

module.exports = {
  'getUserInfo' : (username, callback) => {
    const query = 'SELECT * FROM users WHERE username=$1;';
    const params = [username];
    db.query(query, params, (err, { rows }) => {
      if(err) callback(err, null);
      else callback(null, rows);
    });
  },
  'showUsers' : (callback) => {
    const query = 'SELECT * FROM users;';
    db.query(query, (err, { rows }) => {
      if(err) callback(err, null);
      else callback(null, rows);
    });
  },
  'getWithId' : (id) => {
    const query = `SELECT * FROM users WHERE id=${id};`;
    return new Promise ((resolve, reject) => {
      db.query(query, (err, info ) => {
        if(err) reject(err);
        else resolve(info);
      });
    });
  },

  'updateUser' : (id, updatedInfo) => {
    return new Promise ((resolve, reject) => {
      getWithId(id)
        .then((currentInfo) => {
          Object.keys(updatedInfo).forEach(col => {
            let row = updatedInfo[col];
            if(currentInfo[col] !== updatedInfo[col]) {
              let query = `UPDATE users SET ${col}='${row}' WHERE id=${id};`
              db.query(query, (err, result) => {
                if(err) reject(err);
                else resolve(result);
              });
            };
          });
        })
        .catch(err => console.log(err));
    });
  },


};
