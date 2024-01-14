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

     const url = `${req.protocol}://${req.get('host')}/getUser`;
     console.log(url);
     await new Email(newUser, url).sendWelcome();
     
     res.status(201).json({
       status: 'success',
       data: {
         user: newUser
       }
     });

});

exports.getUser = catchAsync(async (req, res, next) => {
    let doc = await User.findById(req.params.id); 

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });