const express = require('express');
const userController = require('./../controllers/userController');
const router = express.Router();

router.route('/').get(userController.getAllUsers)

router.route('/signup').post(userController.signup)

module.exports = router;
