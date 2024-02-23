const catchAsync = require('./../utils/catchAsync');
const Comment = require('./../models/commentModel');

exports.getAllComments= catchAsync(async(req,res,next) => {
    const data = await Comment.find();

     res.status(200).json({
         status: 'success',
         results: {data},
     })

});

exports.getComment = catchAsync(async (req, res, next) => {
    let comment = await Comment.findById(req.params.id).populate({path:'thread'}).populate({path:'repliedTo'}).populate({path:'replies' ,populate: {path:'replies'}})
    
    res.status(200).json({
      status: 'success',
      data: {
        comment
      }
    });
  });

exports.createComment =  catchAsync(async (req,res,next) => {
    if(!req.body.thread) req.body.thread = req.params.threadId;
    // if(!req.body.user) req.body.user = req.user.id;

    const newComment = await Comment.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {newComment}
    });

});

exports.reply = catchAsync(async (req,res,next) => {
    if(!req.body.thread) req.body.thread = req.params.threadId;
    if(!req.body.repliedTo) req.body.repliedTo = req.params.commentId;
    // if(!req.body.user) req.body.user = req.user.id;

    const newComment = await Comment.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {newComment}
    });

});

