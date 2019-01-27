const db = require('../../database/Queries/ProfileQueries');

module.exports = {
  'updateUser' : (req, res) => {
    let updatedInfo = req.body;
    let id = updatedInfo.id;
    delete updatedInfo.id;
  
    db.updateUser(id, updatedInfo)
      .then(() => {
        db.getWithId(id)
          .then(({ rows }) => {
            return rows[0];
          })
          .then(userInfo => res.send(userInfo))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  },

};