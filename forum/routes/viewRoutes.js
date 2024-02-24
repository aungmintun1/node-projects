const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.route('/').get(authController.protect, viewsController.getThreads)
router.route('/thread/:threadId').get(authController.protect, viewsController.getOneThread)
router.route('/login').get(viewsController.login)

// router.route('/signup').get(viewsController.signup)



module.exports = router;
