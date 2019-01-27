const { Client } = require('pg');

const client = new Client(process.env.DATABASE_URL + '?ssl=true');
client.connect();


const getAllHotelInfo = () => {
  const query = 'SELECT * FROM hotels;';
  return new Promise ((resolve, reject) => {
    client.query(query, (err, { rows }) => {
      if(err) reject(err);
      else resolve(rows);
    });
  });
};


const getAllItems = (arr) => {
  
}


const getItenerary = () => {
  const query = `SELECT * FROM itenerary;`;
  return new Promise((resolve, reject) => {
    client.query(query, (err, { rows }) => {
      if(err) reject(err);
      else resolve(rows);
    });
  });
};

const getEntireItenerary = () => {
  return new Promise ((resolve, reject) => {
    getItenerary()
      .then( itenerary => {
        let response = {};
        itenerary.forEach( day => {
          response[day] = [];
          const query = `SELECT * FROM itenerary_items WHERE day_id=${day.id};`;
          client.query(query,( err, { rows }) => {
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
};





module.exports = client;

// module.exports = { showUsers, getUserInfo, getAllHotelInfo,
//   updateUser, getWithId, getAllVotingTopics, getVotingItemsByTopic, getVoting };