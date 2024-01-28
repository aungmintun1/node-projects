const express = require('express');
const threadController = require('./../controllers/threadController');
const commentRouter = require('./../routes/commentRoutes')
const router = express.Router();

router.use('/:threadId/comments', commentRouter);

router.route('/').get(threadController.getAllThreads)

router.route('/createThread').post(threadController.createThread)
router.route('/getThread/:id').get(threadController.getThread)

module.exports = router;
