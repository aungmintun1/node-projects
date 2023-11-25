const express = require('express');
const shirtController = require('./../controllers/shirtController');
const router = express.Router();


router
.route('/')
.get(shirtController.getAllShirts)


module.exports = router;