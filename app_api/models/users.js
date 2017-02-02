var config = require('../config/config');
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});

/* Method for setting password of user */
userSchema.methods.setPassword = function(password) {
  /* Create a salt then has password with that salt */
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString(hex);
}

/* Method to compare that passwords */
userSchema.methods.validPassword = function(password) {
  /* Compare hashes */
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString(hex);
  return this.hash === hash;
}

/* Function for generating a JWT related to user */
userSchema.methods.generateJwt = function() {
  var expiry = new Date();

  /* Token expires after 1 day */
  expiry.setDate(expiry.getDate() + 1);

  /* Return signed token */
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, config.jwtSecret);
};

mongoose.model('User', userSchema);
