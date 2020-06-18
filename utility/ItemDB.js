const Item = require('../models/item.js');
const UserItems = require('../utility/UserItemDB');

module.exports.getItems = function (catalogCategory) {
    return new Promise((resolve, reject) => {
        Item.find({
            catalogCategory: catalogCategory
        }).then(data => {
            resolve(data);
        }).catch(err => {
            return reject(err);
        })
    })
}//end findAll by category

module.exports.getItem = function (itemCode) {
    return new Promise((resolve, reject) => {
        console.log("in itemDb " + itemCode);
        Item.findOne({
            itemCode: itemCode
        }).exec().then(data => {
            resolve(data);
        }).catch(err => {
            return reject(err);
        })
    })
}
