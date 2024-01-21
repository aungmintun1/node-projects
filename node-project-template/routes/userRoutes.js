const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.route('/').get(userController.getAllUsers)
router.route('/getUser/:id').get(userController.getUser)

router.route('/postUser').post(authController.signup)
router.route('/login').post(authController.login)

router.route('/updatePassword').patch(authController.protect,authController.updatePassword)

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch('/addCart', authController.isLoggedIn, userController.addCart)

router.delete('/removeItem', authController.protect, userController.removeItem)

module.exports = router;
