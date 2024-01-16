const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const router = express.Router();

router
.route('/')
.get(userController.getAllUsers)

router
.route('/postUser')
.post(authController.signup)

router
.route('/login')
.post(authController.login)

router
.route('/getUser/:id')
.get(userController.getUser)

module.exports = router;
