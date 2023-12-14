const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  // these fields are there when a user is created but not needed to be filled in
  // they are only filled in for our functions that require tokens and expiration dates 
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  // if it wasn't modified then go to next middleware
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12, if password was modified(true)

  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function(next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000,10);
    // changes the passowordChangedAt field to the time format of the JWT timestamp

    return JWTTimestamp < changedTimestamp;
    //if JWTTimestamp is less than the passwordChangedAt field then return true
    // 7/1 < 7/2
    //jwt was issued before latest passwordChange. password was changed after jwt was issued
  }

  // False means NOT changed
  // 7/2 < 7/1
  // jwt was issued after latest passwordChange, password hasn't been changed after jwt was issued
  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  //generates a random buffer of 32 bytes and then converts it into a hexadecimal string

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  console.log({ resetToken }, this.passwordResetToken);
  //prints the original resetToken and the hashedToken side by side

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  // creates expiration date for the hashed token, adds 10 minutes to current time

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
