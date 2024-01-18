const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError')
const User = require('./../models/userModel');
const Email = require('./../utils/email');

exports.getAllUsers = catchAsync(async(req,res,next) => {

    const data = await User.find();

     res.status(200).json({
         status: 'success',
         results: {data},
     })
 
});

exports.createUser =  catchAsync(async (req,res,next) => {
     const newUser = await User.create(req.body);

    //  const url = `${req.protocol}://${req.get('host')}/getUser`;
    //  console.log(url);
    //  await new Email(newUser, url).sendWelcome();
     
     res.status(201).json({
       status: 'success',
       data: {
         user: newUser
       }
     });

});

exports.getUser = catchAsync(async (req, res, next) => {
    let doc = await User.findById(req.params.id).populate({
      path:'shirts'
    })

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

  exports.updateUser = catchAsync(async(req,res,next) => {
    
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }
  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });

});
  