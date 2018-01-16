const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const PollController = require('../controllers/poll');

router.post('/my', checkAuth, PollController.getMyPolls);

router.get('/:pollId', PollController.getOnePoll);

router.get('/', PollController.getAllPolls);

router.post('/', checkAuth, PollController.createNewPoll);

router.patch('/:pollId', checkAuth, PollController.updatePoll);

router.delete('/', checkAuth, PollController.deletePoll);

module.exports = router;