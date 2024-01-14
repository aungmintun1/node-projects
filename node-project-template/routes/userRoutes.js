const express = require('express');
const userController = require('./../controllers/userController');
const router = express.Router();

router
.route('/')
.get(userController.getAllUsers)

router
.route('/postUser')
.post(userController.createUser)

router
.route('/getUser/:id')
.get(userController.getUser)

module.exports = router;
