const db = require('../../database/Queries/VotingQueries');

module.exports = {
  'getVotingTopics' : (req, res) => {
    db.getVoting()
      .then(result => res.send(result))
  },
  'castVote' : (req, res) => {
    db.checkVotes(req.body.optionId, req.body.userId)
      .then(({ rows })=> {
        let intent = rows[0].exists === true ? 'remove' : 'add';
        db.vote(req.body.optionId, req.body.userId, intent)
          .then(() => res.end());
      })
      .catch(err => console.log)
  } 
};