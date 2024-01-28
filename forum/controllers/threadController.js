const catchAsync = require('./../utils/catchAsync');
const Thread = require('./../models/threadModel');

exports.getAllThreads = catchAsync(async(req,res,next) => {
    const data = await Thread.find();

     res.status(200).json({
         status: 'success',
         results: {data},
     })

});

exports.createThread =  catchAsync(async (req,res,next) => {
    const newThread = await Thread.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {newThread}
    });

});

exports.getThread = catchAsync(async (req, res, next) => {
    let doc = await Thread.findById(req.params.id).populate({path:'comments'})
    
    // .populate({
    //   path:'cart.shirt'
    // })
    res.status(200).json({
      status: 'success',
      data: {
        doc
      }
    });
  });