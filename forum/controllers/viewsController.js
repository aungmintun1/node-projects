const Thread = require('./../models/threadModel');
const Comment = require('./../models/commentModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');


exports.getThreads = catchAsync(async (req, res, next) => {
    const threads = await Thread.find();
   
    res.status(200).render('base', {
      threads
    });
  });
  
  
  exports.getOneThread = catchAsync(async (req, res, next) => {
    
    //find user through id in URL and then populate shirts field
    const thread = await Thread.findById(req.params.threadId)
    const comments = await Comment.find({ thread: req.params.threadId }).populate({path:'replies' , populate: {path:'replies'}});

    res.status(200).render('thread', {
      thread,
      comments
    });
    
  });