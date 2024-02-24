const express = require('express');
const commentController = require('./../controllers/commentController');
const likecommentRouter = require('./../routes/likecommentRoutes')
const router = express.Router({ mergeParams: true });

router.use('/:commentLikeId/commentLikes', likecommentRouter);

router.route('/').get(commentController.getAllComments)
router.route('/getComment/:id').get(commentController.getComment)

router.route('/createComment').post(commentController.createComment)
router.route('/reply/:commentId').post(commentController.reply)

module.exports = router;
