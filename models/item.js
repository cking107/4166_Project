var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

var itemSchema = new mongoose.Schema({
  itemCode: {type: Number, default: '0000'},
  itemName: {type: String, default: 'itemName'},
  artist: String,
  type: String,
  catalogCategory: {type: String, default: 'itemCategory'},
  rating: String,
  description: {type: String, default: 'itemDescription'},
  imageURL: String
});

module.exports = mongoose.model('Item', itemSchema, 'items');
