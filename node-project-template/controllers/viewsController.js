const Shirt = require('./../models/shirtModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError')

exports.getShirt = catchAsync(async (req, res, next) => {
    let queryObj={...req.query};
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj [el]);

    let queryStr= JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    let query = Shirt.find(JSON.parse(queryStr));

    if (req.query.sort){
      query = query.sort(req.query.sort)
    }

    const shirts = await query
    const user = await User.findById(req.user.id);
  
    res.status(200).render('base', {
      shirts,
      user
    });
  });
  
  exports.updateShirt = catchAsync(async (req, res, next) => {
    const shirt = await Shirt.findById(req.params.id);
  
    res.status(200).render('update', {
      shirt
    });
  });

  exports.signup = catchAsync(async (req, res, next) => {

    res.status(200).render('signup', {
    status: "success"
    });
  });


  exports.login = catchAsync(async (req, res, next) => {

    res.status(200).render('login', {
    status: "success"
    });
  });

  exports.cart = catchAsync(async (req, res, next) => {
    
    //find user through id in URL and then populate shirts field
    const loggedUser = await User.findById(req.params.id).populate({
      path: 'cart.shirt',
    });

    //error if user is not found
    if (!loggedUser) {
      return next(new AppError('There is no user with that name.', 404));
    }

    const totalQuantity = await loggedUser.getTotalQuantity(); 
    const totalPrice = await loggedUser.getTotalPrice();
    const user = { ...loggedUser.toObject(), totalQuantity,totalPrice };
    console.log(user);
    res.status(200).render('cart', {
      user
    });
    
  });

  exports.getOneShirt = catchAsync(async (req, res, next) => {
    const shirt = await Shirt.findById(req.params.id);
    const user = await User.findById(req.user.id);
  
    res.status(200).render('shirt', {
      shirt,
      user
    });
  });