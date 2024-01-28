const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({

name: {
    type: String,
    required: [true, 'enter a name'],
},

password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
},


})


const User = mongoose.model('User', userSchema);
module.exports = User;

