const axios = require('axios');
require('dotenv').config();

const yelpApi = (query) => {
  let options = {
    url: `https://api.yelp.com/v3/businesses/search`,
    headers: {
      'Authorization': `Bearer ${process.env.KEY}`
    },
    params: {
      location: 'Las Vegas',
      sort_by: 'rating',
      term: query,
      limit: 5
    }
  };

  return new Promise ((resolve, reject) => {
    axios.get(`https://api.yelp.com/v3/businesses/search`, options)
      .then(({ data }) => resolve(data))
      .catch(err => reject(err.response));
  });
}

module.exports = { yelpApi };
