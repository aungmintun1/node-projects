const catchAsync = require('./../utils/catchAsync');
const Comment = require('./../models/commentModel');

exports.getAllComments= catchAsync(async(req,res,next) => {
    const data = await Comment.find();

     res.status(200).json({
         status: 'success',
         results: {data},
     })

});

exports.createComment =  catchAsync(async (req,res,next) => {
    const newComment = await Comment.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {newComment}
    });

});