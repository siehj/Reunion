const db = require('../index');

module.exports = {
  'getAllVotingTopics' : () => {
    const query = `SELECT * FROM voting_topics;`;
    return new Promise ((resolve, reject) => {
      db.query(query, (err, { rows }) => {
        if(err) reject(err);
        else resolve(rows);
      });
    });
  },
  'getVotingItemsByTopic' : (topicID) => {
    const query = `SELECT * FROM voting_items WHERE topic_id=${topicID};`;
    // db.query(query, (err, result) => {
    //   if(err) callback(err, null);
    //   else callback(null, result);
    // });
    return new Promise ((resolve, reject) => {
      db.query(query, (err, { rows }) => {
        if(err) reject(err);
        else resolve(rows);
      });
    });
  },
  'getVoting' : () => {
    return new Promise ((resolve, reject) => {
      getAllVotingTopics()
        .then(topics => {
          return new Promise((resolve, reject) => {
            topics.map(topic => {
            topic['options'] = [];
              getVotingItemsByTopic(topic.id)
                .then(items => topic.options = items)
                .then(() => resolve(topics))
                .catch(err => reject(err));
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
