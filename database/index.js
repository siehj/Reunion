const { Client } = require('pg');

const client = new Client(process.env.DATABASE_URL + '?ssl=true');
client.connect();

const addUser = (user) => {
  let { username, password, name } = user;
  const query = `INSERT into users (username, password, name, vote) VALUES ($1, $2, $3, 1);`;
  const params = [username, password, name];
  return new Promise ((resolve, reject) => {
    client.query(query, params, (err, data) => {
      if (err) reject(err);
      else {
        getUserInfo(username, (err, data) => {
          if (err) reject(err);
          else resolve(data);
        })
      };
    });
  });
};

const checkUsername = (username) => {
  const query = 'SELECT EXISTS (SELECT 1 FROM users WHERE username=$1);';
  const params = [username];
  return new Promise ((resolve, reject) => {
    client.query(query, params, (err, { rows }) => {
      if (err) reject(err);
      else resolve(rows[0].exists);
    })
  });
}

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
};

const getAllHotelInfo = () => {
  const query = 'SELECT * FROM hotels;';
  return new Promise ((resolve, reject) => {
    client.query(query, (err, { rows }) => {
      if(err) reject(err);
      else resolve(rows);
    });
  });
};

const updateUser = (id, updatedInfo) => {

  return new Promise ((resolve, reject) => {
    getWithId(id)
      .then((currentInfo) => {
        Object.keys(updatedInfo).forEach(col => {
          let row = updatedInfo[col];
          if(currentInfo[col] !== updatedInfo[col]) {
            let query = `UPDATE users SET ${col}='${row}' WHERE id=${id};`
            client.query(query, (err, result) => {
              if(err) reject(err);
              else resolve(result);
            });
          };
        });
      })
      .catch(err => console.log(err));
  });
};

const getWithId = (id) => {
  const query = `SELECT * FROM users WHERE id=${id};`;
  return new Promise ((resolve, reject) => {
    client.query(query, (err, info ) => {
      if(err) reject(err);
      else resolve(info);
    });
  });
};

const getAllVotingTopics = () => {
  const query = `SELECT * FROM voting_topics;`;
  return new Promise ((resolve, reject) => {
    client.query(query, (err, topics) => {
      if(err) reject(err);
      else resolve(topics);
    });
  });
};

const getVotingItemsByTopic = (topicID) => {
  const query = `SELECT * FROM voting_items WHERE topic_id=${topicID};`;
  return new Promise ((resolve, reject) => {
    client.query(query, (err, items) => {
      if(err) reject(err);
      else resolve(items);
    });
  });
};

module.exports = { findUser, addUser, showUsers, getUserInfo, checkUsername, getAllHotelInfo,
  updateUser, getWithId, getAllVotingTopics, getVotingItemsByTopic };