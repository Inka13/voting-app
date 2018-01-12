const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
	props = {
	userName: req.body.name,
	response: 'Welcome ' + req.body.name,
	signedIn: true,
	}
	
	res.status(200).json(props);
});

module.exports = router;