const db = require('../index');

module.exports = {
  'getAllHotelInfo' : () => {
    const query = 'SELECT * FROM hotels;';
    return new Promise ((resolve, reject) => {
      db.query(query, (err, { rows }) => {
        if(err) reject(err);
        else resolve(rows);
      });
    });
  },
};
