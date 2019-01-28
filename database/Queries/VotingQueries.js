const db = require('../index');

let getAllVotingTopics = () => {
  const query = `SELECT * FROM voting_topics;`;
  return new Promise ((resolve, reject) => {
    db.query(query, (err, { rows }) => {
      if(err) reject(err);
      else resolve(rows);
    });
  });
};

let getVotingItemsByTopic = (topicID) => {
  const query = `SELECT * FROM voting_items WHERE topic_id=${topicID};`;
  return new Promise ((resolve, reject) => {
    db.query(query, (err, { rows }) => {
      if(err) reject(err);
      else resolve(rows);
    });
  });
};

let increment = (optionId) => {
  const query = `UPDATE voting_items SET votes = votes + 1 WHERE id=$1;`;
  const params = [optionId];
  return new Promise ((resolve, reject) => {
    db.query(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    })
  })
};

let decrement = (optionId) => {
  const query = `UPDATE voting_items SET votes = votes - 1 WHERE id=$1;`;
  const params = [optionId];
  return new Promise ((resolve, reject) => {
    db.query(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    })
  })
};

module.exports = {
  'getVoting' : () => {
    return new Promise ((resolve, reject) => {
      getAllVotingTopics()
        .then(topics => {
          return new Promise((res, rej) => {
          let length = topics.length;
          topics.map((topic, idx)=> {
            topic['options'] = [];
              getVotingItemsByTopic(topic.id)
                .then(items => {
                  if(topic.id !== 4) topic.options = items;
                  else {
                    topic['options'] = {};
                    items.map(option => topic['options'][option.name] = option )
                  }
                })
                .then(() => { if(idx === length - 1) res(topics)})
                .catch(err => rej(err));
            }) 
          });
        })
        .then(result =>  resolve(result))
        .catch(err => reject(err)); 
    })
  },
  // User story, a user can vote for any ONE option within a given Topic. 
  'vote' : (optionId, userId, purpose) => {
    let query;
    if (purpose === 'add') query = `INSERT INTO users_voting (item_id, user_id) VALUES ($1, $2);`;
    else query = `DELETE FROM users_voting WHERE item_id=$1 AND user_id=$2;`;
    const params = [optionId, userId];
    return new Promise((resolve, reject) => {
      db.query(query, params, (err, result) => {
        if (err) reject(err);
        else {
          if (purpose === 'add') {
            increment(optionId)
              .then(() => resolve('added'));
          } else {
            decrement(optionId)
              .then(() => resolve('deleted'));
          }
        }
      });
    });
  },

  // Checks if user voted for this option or not
  'checkVotes' : (optionId, userId) => {
    const query = 'SELECT EXISTS (SELECT 1 FROM users_voting WHERE item_id=$1 AND user_id=$2);';
    const params = [optionId, userId];
    return new Promise ((resolve, reject) => {
      db.query(query, params, (err, result) => {
        if(err) reject(err);
        else resolve(result);
      });
    });
  }
};
