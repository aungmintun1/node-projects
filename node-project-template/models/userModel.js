const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema ({

    name: {
    type: String,
    required: [true, 'enter a name'],
    },
    
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
      },

})

const User = mongoose.model('User', userSchema);
module.exports = User;