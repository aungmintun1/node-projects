const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');

exports.getAllUsers = catchAsync(async(req,res,next) => {
    const data = await User.find();

     res.status(200).json({
         status: 'success',
         results: {data},
     })

});

exports.signup =  catchAsync(async (req,res,next) => {
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        newUser
      }
    });

});

exports.getUser = catchAsync(async (req, res, next) => {
  let currentUser = await User.findById(req.params.id);
  
  res.status(200).json({
    status: 'success',
    data: {
      currentUser
    }
  });
});