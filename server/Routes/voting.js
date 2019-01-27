const db = require('../../database/Queries/VotingQueries');

module.exports = {
  'getVotingTopics' : (req, res) => {
    db.getVoting()
      .then(result => res.send(result))
  },
  'castVote' : (req, res) => {

  } 
};