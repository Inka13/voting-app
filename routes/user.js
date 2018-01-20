const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const UserController = require('../controllers/user');

router.post('/signup', UserController.signup);

router.post('/login', UserController.login);

router.delete('/:userId', checkAuth, UserController.deleteUser);

router.get('/ip', UserController.getIP);

router.get('/', UserController.getAllUsers);

module.exports = router;