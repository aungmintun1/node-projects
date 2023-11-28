const express = require('express');
const shirtController = require('./../controllers/shirtController');
const router = express.Router();


router
.route('/')
.get(shirtController.getAllShirts)
.post(shirtController.createShirts)



module.exports = router;