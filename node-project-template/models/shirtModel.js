const mongoose = require('mongoose');

const shirtSchema = new mongoose.Schema ({

        size: {
        type: String,
        required: [true, 'A tour must have a name'],
        },
    
        price: {
            type: Number,
            required: [true, 'A tour must have a duration']
         
        },


})

const Shirt= mongoose.model('Shirt', shirtSchema);

module.exports = Shirt;