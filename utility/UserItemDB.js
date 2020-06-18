const UserItem = require('../models/userItem.js');


module.exports.addItem = function (userID, itemCode) {
console.log("userId");
console.log(userID);
  return new Promise((resolve, reject) => {
    UserItem.findOneAndUpdate({ $and: [{ user: userID }, { item: itemCode }] },
      { $set: { user: userID, item: parseInt(itemCode), rating: 0, listened: 0 } },
      { new: true, upsert: true }, function (err, data) {
        console.log(data);
        resolve(data);
      }).catch(err => { return reject(err); });
  })
};

module.exports.selectUserItems = function (userID) {
  return new Promise((resolve, reject) => {
    UserItem.find({ user: userID }).then(data => {
      console.log("in selectUserItems all " + data);
      resolve(data);
    }).catch(err => { return reject(err); })
  })
}//end findAll

// finds objects for the addStudent() function
module.exports.findByID = function (userID, itemCode) {
  return new Promise((resolve, reject) => {
    UserItem.find({
      $and: [{ user: userID }, { item: itemCode }]
    }).then(data => {
      resolve(data);
    }).catch(err => {
      return reject(err);
    })
  });
}//end findByItemID

module.exports.updateItem = function (userID, userItem) {
  return new Promise((resolve, reject) => {
    UserItem.findOneAndUpdate({ $and: [{ user: userID }, { item: userItem.item.itemCode }] },
      { $set: { user: userID, item: userItem.item.itemCode, rating: userItem.rating, listened: userItem.listened } },
      { new: true, upsert: true }, function (err, data) {
        console.log(data);
        resolve(data);
      }).catch(err => { return reject(err); });
  }
  )
}//end updateItem


module.exports.updateItemRating = function (userID, itemID, rating) {
  return new Promise((resolve, reject) => {
    UserItem.findOneAndUpdate({ $and: [{ user: userID }, { item: itemID }] },
      { $set: { rating: rating } },
      { new: true, upsert: true }, function (err, data) {
        console.log(data);
        resolve(data);
      }).catch(err => { return reject(err); });
  })
}//end updateItem

module.exports.updateItemFlag = function (userID, itemCode, listenedParam) {
  return new Promise((resolve, reject) => {
    console.log("userId in updateflag "+userID)
    UserItem.findOneAndUpdate({ $and: [{ user: userID }, { item: itemCode }] },
      { $set: { listened: listenedParam } }, function (err, data) {
        console.log("updateItemFlag "+data);
        resolve(data);
      }).catch(err => {
        console.log("updateItemFlag error");
      return reject(err); });
  }
  )
}//end updateItem

// deletes this item

module.exports.remove = function (theUser, itemCode) {
  return new Promise((resolve, reject) => {
    UserItem.find({ $and: [{ user: theUser }, { item: itemCode }] }).remove().exec().then(function () {
      resolve()
    }).catch(err => { return reject(err); })

  });
} //end remove

// module.exports.getItemAvgRating = function (itemCode) {
//   return new Promise((resolve, reject) => {
//     UserItem.aggregate([ { $match: {
//       item: itemCode
//   }}]).then(function (data) {
//     console.log("in get Avg rating: "+data);
//       resolve(data)
//     }).catch(err => { return reject(err); })

//   });
// } //end getItemAvgRating

module.exports.selectItemsForAvg = function (itemCode) {
  return new Promise((resolve, reject) => {
    UserItem.find({ item: itemCode }).then(data => {
      console.log("in selectUserItems all " + data);
      resolve(data);
    }).catch(err => { return reject(err); })
  })
}//end findAll
