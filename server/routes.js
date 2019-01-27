const router = require('express').Router();
const auth = require('./Routes/auth.js');
const voting = require('./Routes/voting.js');
const itenerary = require('./Routes/itenerary.js');
const yelp = require('./Routes/yelp.js');


// Registration routes
router.post('/api/login', auth.login);
router.post('/api/signUp', auth.signup);
router.post('/api/logout', auth.logout);

// Yelp api logic
router.post('/api/searchYelp', yelp.searchYelp);

module.exports = router;

