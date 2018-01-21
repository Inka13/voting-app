const Poll = require('../models/poll');
const mongoose = require('mongoose');

exports.getMyPolls = (req, res, next) => {
	const {userId} = req.params;
	Poll.find({posted_by: userId}).select('question options voters posted_on posted_by _id')
	.populate('posted_by')
	.exec()
	.then(polls => {
		res.status(200).json({
			count: polls.length,
			response: 'Fetched polls.',
			polls : polls.map(poll => {
				console.log(poll);
				return {
					id: poll._id,
					question: poll.question,
					options: poll.options,
					posted_by: poll.posted_by.name,
					posted_on: poll.posted_on,
					votes: poll.voters.length,
					voters: poll.voters,
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

exports.getOnePoll = (req, res, next) => {
	const id = req.params.pollId;
	Poll.findOne({ _id: id}).select('question options voters posted_on posted_by _id')
	.populate('posted_by')
	.exec()
	.then(doc => {
		const poll = {
			id: doc._id,
			question: doc.question,
			options: doc.options,
			posted_by: doc.posted_by.name,
			posted_on: doc.posted_on,
			votes: doc.voters.length,
			voters: doc.voters
		}
		res.status(200).json({
			response: 'Fetched poll.',
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
	Poll.find({}).select('question options voters posted_on posted_by _id')
	.populate('posted_by')
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
					posted_by: poll.posted_by.name,
					posted_on: poll.posted_on,
					votes: poll.voters.length,
					voters: poll.voters,
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
		const options = [];
		req.body.options.forEach((option, i) => {
			options[i] = {opt: option, votes: 0};
		});
		const poll = new Poll({
			_id: new mongoose.Types.ObjectId(),
			question:  req.body.question,
			options: options,
			posted_by:  req.body.id,
			posted_on: new Date,
			voters: []
			});
		poll.save().then(result => {
			res.status(201).json({
				response: 'New poll created successfully.'
			});
		})
		.catch(err => {
			console.log(err);
			res.status(400).json({
				err: err
			});
		});	
}


exports.updatePoll = (req, res, next) => {
	const id = req.params.pollId;
	let options = req.body.options;
	let userId = req.body.id;
	let voters = [];
	Poll.findOne({_id: id}).exec()
	.then(poll => {
		if(poll.voters.indexOf(userId)!==-1) res.status(201).json({
			error: 'This machine already voted'
		});
		else {
		voters = [...poll.voters, req.body.id];
		Poll.update({ _id: id }, { $set: {options: options, voters: voters} })
		.then(result => {
		res.status(200).json({
			poll: result,
			response: 'Poll updated.',
		});
		})
		}
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