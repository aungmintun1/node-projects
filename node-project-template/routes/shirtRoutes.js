const express = require('express');
const shirtController = require('./../controllers/shirtController');




const router = express.Router();

router
.route('/')
.get(shirtController.getAllShirt)

router
.route('/postShirt')
.post(shirtController.createShirt)

router
.route('/deleteShirt/:id')
.delete(shirtController.deleteShirt)

router.patch('/updateShirt/:id', shirtController.uploadShirtPhoto,shirtController.resizeUserPhoto,shirtController.updateShirt)

module.exports = router;