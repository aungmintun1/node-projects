const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.route('/').get(authController.protect,viewsController.getShirt)
router.route('/shirt/:id').get(authController.protect,viewsController.getOneShirt)

router.route('/update/:id').get(viewsController.updateShirt)

router.route('/signup').get(viewsController.signup)

router.route('/login').get(viewsController.login)

router.route('/cart/:id').get(viewsController.cart);

module.exports = router;
