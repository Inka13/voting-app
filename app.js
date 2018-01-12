const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan =require('morgan');
const app = express();
const pollsRoutes = require('./routes/polls');
const usersRoutes = require('./routes/users');

const signInRoute = require('./routes/signin');


app.use(bodyParser.json());
app.use(cors());
//app.use(express.static('./client/public'))
app.use(morgan('dev'));

app.use('/polls', pollsRoutes);
app.use('/users', usersRoutes);
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