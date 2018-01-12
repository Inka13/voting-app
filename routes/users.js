const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
	let props = {
	response: 'Editing user',
	signIn: 'Sign In',
	polls: "tols"
	}
	res.status(200).json(props);
});

/*router.post('/', (req, res, next) => {
	let props = {
	userName: 'post',
	response: 'users',
	signIn: 'Sign In',
	polls: "tols"
	}
	res.status(200).json(props);
}); */

module.exports = router;