var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

var userSchema = new mongoose.Schema({
  userID: Number,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  country: String
});

module.exports = mongoose.model('User', userSchema, 'users');
