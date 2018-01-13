const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Poll = require('../models/poll');

router.get('/my/:userId', (req, res, next) => {
	const { userId } = req.params;

	Poll.find({posted_by_id: userId}).select('question options posted_by _id')
	.exec()
	.then(polls => {
		res.status(200).json({
			count: polls.length,
			response: 'Fetched polls.',
			polls : polls.map(poll => {
				return {
					question: poll.question,
					options: poll.options,
					posted_by: poll.posted_by,
					request: {
						type: 'GET',
						url: 'http://localhost:3000/polls/' + poll.id
					}
				}
			})
		});			
	})
	.catch(err => {
		console.log(err);
		res.status(400).json({
			response: 'No polls yet.'
		});
	})
});
router.get('/:pollId', (req, res, next) => {
	const id = req.params.pollId;
	Poll.findOne({ _id: id}).select('question options posted_by _id')
	.exec()
	.then(doc => {
		const poll = {
			question: doc.question,
			options: doc.options,
			posted_by: doc.posted_by,
			request: {
				type: 'GET',
				url: 'http://localhost:3000/polls/' + doc.id
			}
		}
		res.status(200).json({
			response: 'Fetched polls.',
			poll
		});	
	})
	.catch(err => {
		console.log(err);
		res.status(404).json({
			response: 'Not found.'
		});
	})
});
router.get('/', (req, res, next) => {
	Poll.find({}).select('question options posted_by _id')
	.exec()
	.then(polls => {
		res.status(200).json({
			count: polls.length,
			response: 'Fetched polls.',
			polls : polls.map(poll => {
				return {
					question: poll.question,
					options: poll.options,
					posted_by: poll.posted_by,
					request: {
						type: 'GET',
						url: 'http://localhost:3000/polls/' + poll.id
					}
				}
			})
		});			
	})
	.catch(err => {
		console.log(err);
		res.status(400).json({
			response: 'No polls yet.'
		});
	})
});



router.post('/', (req, res, next) => {
	const response = [];
		!req.body.question && response.push("You have to ask a question, right? No blanks!");
		(!req.body.options || req.body.options.length<2) && response.push("Minimum of two options is required");
		!req.body.name && response.push("You have to be signed up to post a new poll!");
	if(response.length<1) {
		const poll = new Poll({
			_id: new mongoose.Types.ObjectId(),
			question:  req.body.question,
			options:  req.body.options,
			posted_by:  req.body.name,
			posted_by_id: req.body.userId,
			posted_on: new Date,
			voters: []
			});
		poll.save().then(result => {
			res.status(201).json({
				createdPoll: {
					question: poll.question,
					options: poll.options,
					posted_by: poll.posted_by,
					request: {
						type: 'GET',
						url: 'http://localhost:3000/polls/' + poll.id
					}
				},
				response: 'New poll created successfully.'
			});
		})
		.catch(err => {
			console.log(err);
			res.status(400).json({
				err
			});
		});	
	} else {
		res.status(400).json({
				response: 'smthng went wrong'
			});
	}

});
router.patch('/:pollId', (req, res, next) => {
	const id = req.params.pollId;
	const updates = {};
	for(const prop of req.body){
		updates[prop.name] = prop.value;
	}
	console.log(updates);
	Poll.update({ _id: id }, { $set: updates }).exec()
	.then(result => {
		res.status(200).json({
			poll: result,
			response: 'Poll updated.',
			updates
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			response: err
		});
	});	
});
router.delete('/:pollId', (req, res, next) => {
	const id = req.params.pollId;
	Poll.remove({_id: id}).exec()
	.then(result => {
		res.status(200).json({
			response: 'Poll deleted.'
		});
	})
	.catch(err => {
		concole.log(err);
		res.status(500).json({
			response: err
		});
	});	
});

module.exports = router;