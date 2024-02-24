const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.route('/').get(userController.getAllUsers)
router.route('/signup').post(userController.signup)

router.route('/getUser/:id').get(userController.getUser)

router.route('/login').post(authController.login)
router.route('/logout').get(authController.logout)

module.exports = router;
