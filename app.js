const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const pollsRoutes = require('./routes/polls');
const usersRoutes = require('./routes/users');
const logInRoute = require('./routes/login');
const signInRoute = require('./routes/signin');


app.use(bodyParser.json());
app.use(cors());
//app.use(express.static('./client/public'))

app.use('/polls', pollsRoutes);
app.use('/users', usersRoutes);
app.use('/signin', signInRoute);
app.use('/signin', logInRoute);

module.exports = app;