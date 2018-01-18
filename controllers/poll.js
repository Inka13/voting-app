const Poll = require('../models/poll');
const mongoose = require('mongoose');

exports.getMyPolls = (req, res, next) => {
	const userId = req.body.id;
	Poll.find({posted_by: userId}).select('question options posted_by _id')
	.exec()
	.then(polls => {
		polls.map(poll => {
			return {
				id: poll._id,
				question: poll.question,
				options: poll.options,
				posted_by: poll.posted_by,
				request: {
					type: 'GET',
					url: 'http://localhost:3000/polls/' + poll.id
				}
			}
		});	
		if(polls.length<1) response = "You don't have any polls yet.";
		else response = "Fetched polls.";
		res.status(200).json({
			response,
			polls
		});	
	})
	.catch(err => {
		console.log(err);
		res.status(400).json({
			response: 'No polls yet.'
		});
	})
}

exports.getOnePoll = (req, res, next) => {
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
}

exports.getAllPolls = (req, res, next) => {
	Poll.find({}).select('question options posted_by _id')
	.exec()
	.then(polls => {
		res.status(200).json({
			count: polls.length,
			response: 'Fetched polls.',
			polls : polls.map(poll => {
				return {
					id: poll._id,
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
}

exports.createNewPoll = (req, res, next) => {
	const response = [];
		!req.body.question && response.push("You have to ask a question, right? No blanks!");
		(!req.body.options || req.body.options.length<2) && response.push("Minimum of two options is required");
		!req.body.id && response.push("You have to be signed up to post a new poll!");
	if(response.length<1) {
		const options = [];
		req.body.options.forEach((option, i) => {
			options[i] = {opt: option, votes: 0};
		})
		const poll = new Poll({
			_id: new mongoose.Types.ObjectId(),
			question:  req.body.question,
			options,
			posted_by:  req.body.id,
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
			response
		});
	}

}

exports.updatePoll = (req, res, next) => {
	const id = req.params.pollId;
	const updates = {};
	for(const prop of req.body){
		updates[prop.name] = prop.value;
		if(prop.name==="options") {
			const options = [];
			updates[prop.name].forEach((option, i) => {
				options[i] = {opt: option, votes: 0};
			});
			updates[prop.name] = options;
		}
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
}

exports.deletePoll = (req, res, next) => {
	const id = req.body.pollId;
	const userId = req.body.userId;
	
	Poll.remove({$and : [ {_id: id}, {posted_by: userId} ]}).exec()
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
}