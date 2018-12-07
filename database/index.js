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
    client.query(query, (err, { rows }) => {
      if(err) reject(err);
      else resolve(rows);
    });
  });
};

const getVotingItemsByTopic = (topicID) => {
  const query = `SELECT * FROM voting_items WHERE topic_id=${topicID};`;
  // client.query(query, (err, result) => {
  //   if(err) callback(err, null);
  //   else callback(null, result);
  // });
  return new Promise ((resolve, reject) => {
    client.query(query, (err, { rows }) => {
      if(err) reject(err);
      else resolve(rows);
    });
  });
};

const getAllItems = (arr) => {
  
}

const getVoting = () => {
  return new Promise ((resolve, reject) => {
    getAllVotingTopics()
      .then( topics => {
        return new Promise((res, rej) => {
          topics.map(topic => {
          let count = 1;
          topic['options'] = [];
            getVotingItemsByTopic(topic.id)
              .then(items => topic.options = items)
              .then(() => res(topics))
              .catch(err => rej(err));
          })
          
        });
      })
      // .then( topics => {
      //   topics.forEach(t => {
      //     getVotingItemsByTopic(t.id)
      //       .then(items => t.options = items)
      //       .then(() => resolve(t))
      //   })
      // })
      .then(result => console.log('result...', result))
      .catch(err => reject(err)) 
  });
};

const getItenerary = () => {
  const query = `SELECT * FROM itenerary;`;
  return new Promise((resolve, reject) => {
    client.query(query, (err, { rows }) => {
      if(err) reject(err);
      else resolve(rows);
    });
  });
};

const getEntireItenerary = () => {
  return new Promise ((resolve, reject) => {
    getItenerary()
      .then( itenerary => {
        let response = {};
        itenerary.forEach( day => {
          response[day] = [];
          const query = `SELECT * FROM itenerary_items WHERE day_id=${day.id};`;
          client.query(query,( err, { rows }) => {
            if(err) reject(err);
            else {
              repsonse[day].push(rows);
              resolve(response);
            }
          });
        });
      })
      .catch(err => reject(err));
  });
};


// User story, a user can vote for any ONE option within a given Topic. 
const vote = () => {
  

};

// Checks a user's voting eligibility by checking the users_voting table to see if the userId is there
const checkVotes = (userId) => {
  const query = 'SELECT EXISTS (SELECT 1 FROM users_voting WHERE user_id=$1);';
  const params = [userId];
  return new Promise ((resolve, reject) => {
    client.query(query, (err, result) => {
      if(err) reject(err);
      else resolve(result);
    });
  });
};

module.exports = { findUser, addUser, showUsers, getUserInfo, checkUsername, getAllHotelInfo,
  updateUser, getWithId, getAllVotingTopics, getVotingItemsByTopic, getVoting };