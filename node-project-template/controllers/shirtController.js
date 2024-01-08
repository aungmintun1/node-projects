const Shirt = require('./../models/shirtModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError')


exports.getAllShirt = catchAsync(async(req,res,next) => {

       const data = await Shirt.find();

        res.status(200).json({
            status: 'success',
            results: {data},
        })
    
});

exports.createShirt =  catchAsync(async (req,res,next) => {
        const newShirt = await Shirt.create(req.body);

        // Send a JSON response back to the client
        res.status(201).json({
          status: 'success',
          data: {
            shirt: newShirt
          }
        });

});

exports.deleteShirt = catchAsync(async (req,res,next) => {
    const doc = await Shirt.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No shirt found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
});

  
  exports.updateShirt = catchAsync(async(req,res,next) => {
    
    const doc = await Shirt.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if(!doc){
      console.log('this is !doc')
      return next(new AppError('No shirt found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });

});
  