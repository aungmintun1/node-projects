const mongoose = require('mongoose');

const shirtSchema = new mongoose.Schema ({

        size: {
        type: String,
        required: [true, 'A shirt must have a size'],
        enum: {
            values: ['small', 'medium', 'large'],
            message: 'the size must be small, medium or large'
          }
        },
        
        price: {
            type: Number,
            required: [true, 'A shirt must have a price']
        },

})

const Shirt= mongoose.model('Shirt', shirtSchema);
module.exports = Shirt;