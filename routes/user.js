const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

router.post('/', (req, res, next) => {
	const user = new User({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		password: req.body.password,
		email: req.body.email
	});
	user.save().then(result => {
		res.status(201).json({
			createdUser: user,
			response: 'Welcome ' + user.name
		});
	})
	.catch(err => {
		//console.log(err);
		const response = [];
		!req.body.email && response.push("Email can't be blank");
		!req.body.name && response.push("Name can't be blank");
		!req.body.password && response.push("Password can't be blank");
		if(response.length<1) response.push("There is already a user with that username or email");
		res.status(400).json({
			response
		});
	});	
});
router.get('/:name*', (req, res, next) => {
	const { name } = req.params;
	const password = req.query.password;
	const response = [];
	User.findOne({name, password}).exec()
	.then(user => {
		res.status(200).json({
			user,
			response: 'Welcome ' + user.name
		});			
	})
	.catch(err => {
		console.log(err);
		!name && response.push("Name can't be blank");
		!password && response.push("Password can't be blank");
		if(response.length<1) response.push("Username and password dont match");
		res.status(400).json({
			response
		});
	})
	
});


module.exports = router;