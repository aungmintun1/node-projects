const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError')
const User = require('./../models/userModel');
const Email = require('./../utils/email');

const filterObj = (obj, ...allowedFields) => {
  //returns a filter object that contains only names specified in the array parameter ...allowedFields
  //newObj stores the fields specified
  //Object.keys returns an array of the object field names, we then loop over each name
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async(req,res,next) => {

    const users = await User.find();

     // Map each user to a promise that resolves to the user with totalQuantity added
  const usersWithTotalQuantityPromises = users.map(async (user) => {
    const totalQuantity = await user.getTotalQuantity();
    return { ...user.toObject(), totalQuantity };
  });

  // Await all the promises to resolve
  const usersWithTotalQuantity = await Promise.all(usersWithTotalQuantityPromises);

     res.status(200).json({
         status: 'success',
         results: usersWithTotalQuantity,
     });
 
});

exports.createUser = catchAsync(async (req,res,next) => {
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
      path:'cart.shirt'
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

exports.addCart = catchAsync(async(req,res,next) => {
  const user = req.user;
  console.log(user);
  
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password updates. Please use /updateMyPassword.',400));
  }

  const shirtId = req.body.shirt
  const quantity = req.body.quantity
 
  const cartItem = user.cart.find(item => item && item.shirt && item.shirt.equals(shirtId));

  //iterates through each whole shirt object in the cart array
  //if one of the objects whose shirt field equals the id then it returns true and that item

  if (cartItem) {
    // If the shirt is already in the cart, increment the quantity that was inputted
    cartItem.quantity += quantity;
  } else {
    // If the shirt is not in the cart, add the shirt along with the inputted quantity
    user.cart.push({ shirt: shirtId, quantity: quantity });
  }

  // Save the updated user document
  await user.save({ validateBeforeSave: false });

  res.status(201).json({
    status: 'success',
    data: {
      user
    }
  });

});
  

exports.deleteItem = catchAsync(async(req,res,next) => {
  const user = req.user;
  const shirtId = req.body.shirt;

  const updatedUser = await User.findByIdAndUpdate(user.id, {
    $pull: { cart: { shirt: shirtId } } // This will remove all items with this shirtId
  }, {
    new: true,
    runValidators: true
  });

  res.status(201).json({
    status: 'success',
    data: {
      updatedUser
    }
  });

});

exports.edit = catchAsync(async(req,res,next) => {
  const user = req.user;

  const shirtId = req.body.shirt
  const quantity = req.body.quantity
 
  const cartItem = user.cart.find(item => item && item.shirt && item.shirt.equals(shirtId));

  if (cartItem)
    cartItem.quantity = quantity;
  
  await user.save({ validateBeforeSave: false });

  res.status(201).json({
    status: 'success',
    data: {
      user
    }
  });

});




exports.addItems = catchAsync(async(req,res,next) => {
  const user = req.user;
  const shirtId = req.body.shirt;
  const numItems = req.body.quantity;

  const updatedUser = await User.findByIdAndUpdate(user.id, {
    $push:  { cart: { shirt: shirtId, quantity: numItems }} 
  },
  {
    new: true,
    runValidators: true
  });

  res.status(201).json({
    status: 'success',
    data: {
      updatedUser
    }
  });

});


