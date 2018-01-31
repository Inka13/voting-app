const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const PollController = require('../controllers/poll');

router.get('/my/:userId', PollController.getMyPolls);

router.get('/latest', PollController.getLatest);

router.get('/popular', PollController.getPopular);

router.get('/:pollId', PollController.getOnePoll);

router.get('/', PollController.getAllPolls);

router.post('/', PollController.createNewPoll);



router.patch('/:pollId', PollController.updatePoll);

router.delete('/:pollId', PollController.deletePoll);

module.exports = router;