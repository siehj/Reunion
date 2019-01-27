const db = require('../../database/Queries/ServiceQueries');

module.exports = {
  'getHotelInfo' : (req, res) => {
    db.getAllHotelInfo()
      .then(result => res.send(result))
      .catch(err => console.log('Error getting hotel content from the db', err));
  },
  
};
