const db = require('../index');

module.exports = {
  'getItenerary' : () => {
    const query = `SELECT * FROM itenerary;`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, { rows }) => {
        if(err) reject(err);
        else resolve(rows);
      });
    });
  }, 
  'getEntireItenerary' : () => {
    return new Promise ((resolve, reject) => {
      getItenerary()
        .then( itenerary => {
          let response = {};
          itenerary.forEach( day => {
            response[day] = [];
            const query = `SELECT * FROM itenerary_items WHERE day_id=${day.id};`;
            db.query(query,( err, { rows }) => {
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
  },
};
