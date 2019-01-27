const { Client } = require('pg');

const client = new Client(process.env.DATABASE_URL + '?ssl=true');
client.connect();


const getAllHotelInfo = () => {
  const query = 'SELECT * FROM hotels;';
  return new Promise ((resolve, reject) => {
    client.query(query, (err, { rows }) => {
      if(err) reject(err);
      else resolve(rows);
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
      .then(result =>  resolve(result))
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

module.exports = client;

// module.exports = { showUsers, getUserInfo, getAllHotelInfo,
//   updateUser, getWithId, getAllVotingTopics, getVotingItemsByTopic, getVoting };