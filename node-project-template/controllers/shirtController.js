const Shirt = require('./../models/shirtModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError')
const multer = require('multer');
const sharp = require('sharp');


const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadShirtPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.originalname = `shirt-${req.params.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/shirts/${req.file.originalname}`);

  next();
});


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
    
    
    if (req.file) req.body.photo = req.file.originalname;
    console.log('orginal name is ',req.body.photo);
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
  