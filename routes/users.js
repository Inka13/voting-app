const express = require('express');
const router = express.Router();


/*router.get('/:_username', (req, res, next) => {
	let props = {
	response: 'Adding a user'
	}
	res.status(200).json(props);
}); */
router.post('/:_username', (req, res, next) => {
	let props = {
	response: 'Adding a user'
	}
	res.status(200).json(props);
});
router.patch('/:_userName', (req, res, next) => {
	let props = {
	response: 'Editing user',
	}
	res.status(200).json(props);
});


module.exports = router;