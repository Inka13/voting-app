const express = require('express');
const router = express.Router();

router.get('/my/:_userName', (req, res, next) => {
	let props = {
	response: 'Getting my polls',
	polls: ["polls"]
	}
	res.status(200).json(props);
});
router.get('/all', (req, res, next) => {
	let props = {
	response: 'Getting all polls',
	polls: ["polls"]
	}
	res.status(200).json(props);
});

router.post('/:_id', (req, res, next) => {
	let props = {
	response: 'Editing poll',
	polls: ["polls"]
	}
	res.status(200).json(props);
});
/*router.post('/:_id', (req, res, next) => {
	let props = {
	response: 'Getting my polls',
	polls: ["polls"]
	}
	res.status(200).json(props);
});*/

module.exports = router;