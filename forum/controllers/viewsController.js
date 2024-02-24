const Thread = require('./../models/threadModel');
const Comment = require('./../models/commentModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');


exports.getThreads = catchAsync(async (req, res, next) => {
    const threadsWithoutTotal = await Thread.find().populate('likes').populate('comments');

     const threads = threadsWithoutTotal.map(thread => {
      // Convert document to a plain object to modify it
      const threadObject = thread.toObject();
      threadObject.totalComments = thread.comments.length;
      threadObject.totalLikes = thread.likes.length;
  
      return threadObject;
    });

    const user = await User.findById(req.user.id);

   
    res.status(200).render('base', {
      threads,
      user
    });
  });
  
  
  exports.getOneThread = catchAsync(async (req, res, next) => {
    
    //find user through id in URL and then populate shirts field
    const thread = await Thread.findById(req.params.threadId).populate('likes')
    const commentsWithoutTotal = await Comment.find({ thread: req.params.threadId })
    .populate('commentLikes')
    .populate({
      path: 'replies',
      populate: {
        path: 'replies',
        populate: {
          path: 'replies' // Add further levels as needed
          // ... You can continue adding more levels of 'populate' here
        }
      }
    });
    
 
    const comments = commentsWithoutTotal.map(comment => {
      const commentObject = comment.toObject();
      commentObject.totalLikes = comment.commentLikes.length;

      return commentObject;
    });


    const totalComments = comments.length;
    const totalThreadLikes = thread.likes.length;

    const user = await User.findById(req.user.id);

    res.status(200).render('thread', {
      thread,
      comments,
      totalComments,
      totalThreadLikes,
      user
    });
    
  });

  exports.login = catchAsync(async (req, res, next) => {

    res.status(200).render('login', {
    status: "success"
    });
  });