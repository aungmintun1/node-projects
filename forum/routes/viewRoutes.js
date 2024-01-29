const express = require('express');
const viewsController = require('./../controllers/viewsController');

const router = express.Router();

router.route('/').get(viewsController.getThreads)
router.route('/thread/:threadId').get(viewsController.getOneThread)

// router.route('/update/:id').get(viewsController.updateShirt)

// router.route('/signup').get(viewsController.signup)

// router.route('/login').get(viewsController.login)

// router.route('/cart/:id').get(viewsController.cart);

module.exports = router;
