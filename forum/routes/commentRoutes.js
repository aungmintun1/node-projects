const express = require('express');
const commentController = require('./../controllers/commentController');
const router = express.Router({ mergeParams: true });



router.route('/').get(commentController.getAllComments)

router.route('/createComment').post(commentController.createComment)

module.exports = router;
