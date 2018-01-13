const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	let props = {
	response: 'Getting all polls',
	polls: ["polls"]
	}
	res.status(200).json(props);
});
router.get('/:_userName', (req, res, next) => {
	let props = {
	response: 'Getting my polls',
	polls: ["polls"]
	}
	res.status(200).json(props);
});


router.post('/add/:_id', (req, res, next) => {
	let props = {
	response: 'Adding poll',
	polls: ["polls"]
	}
	res.status(200).json(props);
});
router.post('/edit/:_id', (req, res, next) => {
	let props = {
	response: 'Editing poll',
	polls: ["polls"]
	}
	res.status(200).json(props);
});
router.delete('/:_id', (req, res, next) => {
	let props = {
	response: 'Getting my polls',
	polls: ["polls"]
	}
	res.status(200).json(props);
});

module.exports = router;