const helper = require('../../services/yelp');

module.exports = {
  'searchYelp' : (req, res) => {
    helper.yelpApi(req.body.query)
      .then(({ businesses }) => res.send(businesses))
      .catch(err => console.log('err with server-side search', err));
  }
};