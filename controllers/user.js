const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
	User.find({ $or: [ {email: req.body.email}, { name: req.body.name } ] }).exec()
	.then(users => {
		if(users.length>0) {
			res.status(200).json({
				message: "No auth"
			});
		} else {
			bcrypt.hash(req.body.password, 10, (err, hash) => {
				if(err) {
					return res.status(500).json({
						error: err
					})
				} else {
					const user = new User({
						_id: new mongoose.Types.ObjectId(),
						name: req.body.name,
						password: hash,
						email: req.body.email
					});
					user.save().then(result => {
						res.status(201).json({
							createdUser: user,
							response: 'Pretty ' + user.name + ' on UglyPoller'
						});
					});
				}
			});	
		}
		
	})
	.catch(err => {
		//console.log(err);
		const response = [];
		!req.body.email && response.push("Email can't be blank");
		!req.body.name && response.push("Name can't be blank");
		!req.body.password && response.push("Password can't be blank");
		if(response.length<1) response.push("Invalid email");
		res.status(400).json({
			response
		});
	});	
}

exports.login = (req, res, next) => {
	User.find({name: req.body.name}).exec()
	.then(users => {
		if(users.length<1) {
			res.status(401).json({
				response: 'Auth failed'
			});		
		} else {
			bcrypt.compare(req.body.password, users[0].password, (err, result) => {
				if(err) {
					res.status(401).json({
						response: 'Auth failed'
					});	
				} else {
					if(result) {
						const token = jwt.sign({
							name: users[0].name,
							id: users[0]._id
						}, process.env.JWT_KEY, 
						{
							expiresIn: '1h'
						}
						);
						res.status(200).json({
							response: 'Auth success',
							user: users[0],
							token
						});	
					} else {
						res.status(401).json({
							response: 'Auth failed'
						});	
					}
				}
			});
		}	
	})
	.catch(err => {
		console.log(err);
		response.push("Username and password don't match");
		res.status(400).json({
			response
		});
	})
}

exports.deleteUser = (req, res, next) => {
	const id = req.params.userId;
	User.remove({_id: id}).exec()
	.then(result => {
		res.status(200).json({
			response: 'User deleted.'
		});
	})
	.catch(err => {
		concole.log(err);
		res.status(500).json({
			response: err
		});
	});		
}
exports.getIP = (req, res, next) => {
  const ipaddress = req.headers["x-forwarded-for"].split(',')[0];
  console.log(ipaddress);
  res.status(200).json({ ip: ipaddress});
};

exports.getAllUsers = (req, res, next) => {
	User.find({}).exec()
	.then(users => {
		res.status(200).json({
			users,
		});			
	})
	.catch(err => {
		console.log(err);
		res.status(400).json({
			response: err
		});
	})
	
}