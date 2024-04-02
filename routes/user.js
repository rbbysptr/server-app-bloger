const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authentication = require('../middleware/authentication');
const adminOnly = require('../middleware/adminOnly');


router.post('/login', UserController.loginUser);

router.post('/add-user',authentication,adminOnly, UserController.registerUser);

module.exports = router;
