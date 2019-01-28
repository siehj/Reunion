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
  'vote' : () => {},

  // Checks a user's voting eligibility by checking the users_voting table to see if the userId is there
  'checkVotes' : (userId) => {
    const query = 'SELECT EXISTS (SELECT 1 FROM users_voting WHERE user_id=$1);';
    const params = [userId];
    return new Promise ((resolve, reject) => {
      db.query(query, (err, result) => {
        if(err) reject(err);
        else resolve(result);
      });
    });
  }
};
