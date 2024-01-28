const express = require('express');
const commentController = require('./../controllers/commentController');
const router = express.Router({ mergeParams: true });

router.route('/').get(commentController.getAllComments)
router.route('/getComment/:id').get(commentController.getComment)

router.route('/createComment').post(commentController.createComment)
router.route('/reply/:commentId').post(commentController.reply)

module.exports = router;
