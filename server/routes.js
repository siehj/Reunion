const router = require('express').Router();
const auth = require('./Routes/auth');
const voting = require('./Routes/voting');
const itenerary = require('./Routes/itenerary');
const yelp = require('./Routes/yelp');
const user = require('./Routes/userProfile');
const service = require('./Routes/service');

// Registration routes
router.post('/api/login', auth.login);
router.post('/api/signUp', auth.signup);
router.post('/api/logout', auth.logout);

// Yelp api logic
router.post('/api/searchYelp', yelp.searchYelp);

// User Profile routes
router.post('/api/sendUserUpdate', user.updateUser);

// Voting service logic
router.get('/api/getAllVotingTopics', voting.getVotingTopics);
router.post('/api/castVote', voting.castVote);

// Itenerary routes

// Other service routes
router.get('/db/hotelInfo', service.getHotelInfo);

module.exports = router;

