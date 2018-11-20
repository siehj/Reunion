import axios from 'axios';
require('dotenv').config();

const YelpApi = (query, callback) => {
  let options = {
    url: `https://api.yelp.com/v3/businesses/search`,
    headers: {
      'Authorization': `Bearer ${config.KEY}`
    },
    qs: {
      location: 'Las Vegas',
      term: query,
      limit: 5
    }
  };

  // axios.get(options)
}

module.exports = { YelpApi }
