var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

var userItemSchema = new mongoose.Schema({
   //define the schema - this can take place of the model
    user: String,
    item: Number,
    rating: Number,
    listened: Number
  });

module.exports = mongoose.model('UserItem', userItemSchema,'userItems');

/*
class UserItem {
  constructor(item, rating, listened) {
    this.item = item;
    this.rating = rating;
    this.listened = listened;
  }

  getItem() {
    return this.item;
  };

  setItem(item) {
    this.item = item;
  };

  getRating() {
    return rating;
  };

  setRating(rating) {
    this.rating = rating;
  };

  getListened() {
    return this.listened;
  };

  setListened(listened) {
    this.listened = listened;
  };
}

module.exports = UserItem;
*/
