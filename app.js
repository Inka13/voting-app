const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan =require('morgan');
const mongoose = require('mongoose');
const app = express();
const pollRoutes = require('./routes/poll');
const userRoutes = require('./routes/user');
const signInRoute = require('./routes/signin');

mongoose.connect(process.env.MONGOLAB_URI,
	{
		useMongoClient: true
	}
);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/polls', pollRoutes);
app.use('/users', userRoutes);
app.use('/signin', signInRoute);


app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
})
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	})
})
module.exports = app;