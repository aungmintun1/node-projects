const catchAsync = require('./../utils/catchAsync');
const Thread = require('./../models/threadModel');
const Comment = require('./../models/commentModel');
const Like = require('./../models/likeModel');

exports.getAllThreads = catchAsync(async(req,res,next) => {
    const data = await Thread.find().populate({path:'comments'});

    //adds total Comments to each thread
    const modifiedData = data.map(thread => {
      // Convert document to a plain object to modify it
      const threadObject = thread.toObject();
      threadObject.totalComments = thread.comments.length;
      return threadObject;
    });

     res.status(200).json({
         status: 'success',
         results: {modifiedData},
     })

});

exports.createThread =  catchAsync(async (req,res,next) => {
    if(!req.body.username) req.body.username= req.user.name;
    
    const newThread = await Thread.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {newThread}
    });

});

exports.getThread = catchAsync(async (req, res, next) => {
    let thread = await Thread.findById(req.params.id).populate('likes').populate({path:'comments', populate: {path:'replies'}})

    let commentTotal = await Comment.countDocuments({thread: req.params.id});
    let likeTotal = await Like.countDocuments({thread: req.params.id});
    
    res.status(200).json({
      status: 'success',
      data: {
        thread,
        totalComments: commentTotal,
        totalLikes: likeTotal
        
      }
    });
  });