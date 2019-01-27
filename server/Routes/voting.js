const db = require('../../database');

module.exports = {
  'getVotingTopics' : (req, res) => {
    db.getVoting()
      .then(result => res.send(result))
  },
  'castVote' : (req, res) => {

  } 
};