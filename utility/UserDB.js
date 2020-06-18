const User = require('../models/User');

module.exports.getUsers = function() {
    return new Promise((resolve, reject) => {
        User.find().then(data => {
            resolve(data);
        }).catch(err => {
            return reject(err);
        })
    })
}

module.exports.getUser = function(userEmail, userPassword) {
    return new Promise((resolve, reject) => {
        User.findOne({
            email: userEmail,
            password: userPassword
        }).exec().then(data => {
            console.log("here +" + userEmail);
            resolve(data);
        }).catch(err => {
            return reject(err);
        })
    })
}

module.exports.addUser = function(userPassword, userfn, userln, userEmail, userAddress, userCity, userState, userZip, userCountry) {
  return new Promise((resolve, reject) => {
    User.insert({
      password: userPassword,
      firstName: userfn,
      lastName: userln,
      email: userEmail,
      address: userAddress,
      city: userCity,
      state: userState,
      zip: userZip,
      country: userCountry
    }).exec().then(data => {
        resolve(data);
    }).catch(err => {
        return reject(err);
    })
  })
}
