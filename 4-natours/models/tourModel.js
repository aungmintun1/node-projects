const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema ({
    name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true
    },

    duration: {
        type: Number,
        required: [true, 'A tour must have a duration']
    },

    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size']
    },

    difficulty: { 
        type: String,
        required: [true, 'A tour must have a difficulty']
    }, 
    
    ratingsAverage: {
    type: Number,
    default: 4.5
    },

    ratingsQuantity:{
        type:Number,
        default: 0
    },

    price: {
    type: Number,
    required: [true, 'A tour must have a price']
    },

    priceDiscount: Number,

    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a description']
    },

    description: {
        type: String,
        trim: true
    },

    imageCover:{
        type: String,
        required: [true, 'A tour must have a cover image']
    },

    images: [String],

    createdAt:{
        type: Date,
        default: Date.now(),
        select:false
    },

    startDates: [Date],
    
 },
 {
    toJSON: { virtuals: true },
    to0bject: { virtuals: true }
    }
);

    tourSchema.virtual('durationWeeks').get (function() {
        return this.duration / 7
        });

    // DOCUMENT MIDDLEWARE: runs before .save() and .create()
    // tourSchema.pre('save', function(next) {
    // console.log(this) 
    // next();
    // })

    // tourSchema. post('save', function (doc, next) {
    //     console.log(doc);
    //     next();
    // })

    //query middleware

    tourSchema.pre(/^find/, function(next) {
        this.find({ secretTour: { $ne: true } });
        next();
        });

    // AGGREGATION MIDDLEWARE
    tourSchema.pre('aggregate', function(next) {
    this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
    console.log(this.pipeline());
    next();
    });



    const Tour = mongoose.model('Tour', tourSchema);

    module.exports = Tour;