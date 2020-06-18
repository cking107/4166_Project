var express = require('express');
var router = express.Router();

var ItemDB = require('../utility/ItemDB');
let UserItemDB = require('../utility/UserItemDB');

const { check, validationResult } = require('express-validator/check');
router.use(express.json());

//MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/music', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connection Successful");
});

var itemArray;

/* GET home page. */
router.get("/*", async function(request, response, next) {

  let altRock = await ItemDB.getItems("Alternative Rock");
  let jazz = await ItemDB.getItems("Jazz");
  itemArray = [{ categoryName: "Alternative Rock", items: altRock }, { categoryName: "Jazz", items: jazz }];
  console.log("items list length: " + itemArray.length);
    //checking session
    console.log("checking for session data");
    let sessionProfile = request.session.currentProfile;

    if (typeof sessionProfile != 'undefined'){ //session data exists. Use that.
        //console.log("session profile " + sessionProfile);
        //add user to view
        response.locals.theUser = request.session.theUser;
    }
    next();
});

router.get('/', function (request, response, next) {
    //render homepage view
response.render("index");
});

router.get('/categories', async function (req, res) {
    //get items list from database

    // validate request to set view address and data
    var viewData = await catalogValidation(req, res);
    console.log("view data from catalogvalidation: " + viewData);
    console.log("items list: " + viewData.view);

    console.log("in categories: " + JSON.stringify(viewData.data));

    res.render(viewData.view, { data: viewData.data });
});


router.get('/categories/:categoryName', function (req, res) {
    var categoryName = req.params.categoryName;

    // this route displays catalog of items for one category

    // validate request to set view address and data
    var viewData = catalogValidation(req, res);

    res.render(viewData.address, viewData.data);
});


router.get('/categories/item/:itemCode', [
  check('itemCode').isNumeric(),
  check('itemName').isAlphanumeric(),
  check('catalogCategory').isAlpha(),
  check('type').isAlpha(),
  check('listened').isNumeric()
], async function (req, res) {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
  } else {
    console.log("no errors");
  }
    // this route displays item view

    // validate request to set view address and data
    var viewData = await catalogValidation(req, res);
    console.log("in GET an item: " + JSON.stringify(viewData.data));
    res.render(viewData.view, { data: viewData.data });
});

router.get('/categories*', function (req, res) {
    // handle anything else coming through to /categories
    // validate request to set view address and data
    var viewData = catalogValidation(req, res);
    viewAddress = 'categories';
});

//for contact and about views
// router.get('/contact', function (req, res) {
//     // render contact view
//     viewAddress = 'contact';
//     res.render(viewData.address);
// });

// router.get('/about', function (req, res) {
//     //render about view
//     viewAddress = 'about';
//     res.render(viewData.address);
// });

var catalogValidation =  async function (req, res) {
  //create variables to hold the needed information for rendering
  var viewAddress = 'categories';
  var viewData = itemArray;

  //Check If the catalog request parameter exists and validates (is not null and is not empty and is a valid category)
  if (req.params.categoryName != null && req.params.categoryName != "") {
      //Get the items of this category from the items list
      //Set viewAddress to catalog view
      viewAddress = 'categories';
      //Set viewData to item list (narrowed down catalog)
      viewData = itemArray;
      //return data and how to display it
      catalog = { address: viewAddress, data: viewData };
      return catalog;
      //Check if the itemCode request parameter exists and validates (is not null and is not empty)
      //Check if the itemCode exists in the items list
  } else if (req.params.itemCode != null && req.params.itemCode != "") {
      //Set viewAddress to item view
      console.log("req.params.itemCode: " + req.params.itemCode);
      viewAddress = 'item';
      //Get item object from items list
      viewData = await ItemDB.getItem(req.params.itemCode);
      let itemRating = await UserItemDB.selectItemsForAvg(req.params.itemCode);
      let rating = await getAvg(itemRating);
      let ratingImg = "No rating"; //default rating image
      if (rating >= 1 && rating < 2) {
          ratingImg = "1/10";
      } else if (rating >= 2 && rating < 3) {
          ratingImg = "2/10";
      } else if (rating >= 3 && rating < 4) {
          ratingImg = "3/10";
      } else if (rating >= 4 && rating < 5) {
          ratingImg = "4/10";
      } else if (rating >= 5 && rating < 6) {
          ratingImg = "5/10";
      } else if (rating >= 6 && rating < 7) {
          ratingImg = "6/10";
      } else if (rating >= 7 && rating < 8) {
          ratingImg = "7/10";
      } else if (rating >= 8 && rating < 9) {
          ratingImg = "8/10";
      } else if (rating >= 9 && rating < 10) {
          ratingImg = "9/10";
      } else if (rating >= 10) {
          ratingImg = "10/10";
      }

      //Set viewData to this item object
      viewData.rating = ratingImg; //set rating image
      viewData.inProfile = isProfileItem(req);

      //return data and how to display it
      catalog = { view: viewAddress, data: viewData };

      return catalog;

  } else { // If the itemCode does not validate
      // Default - Categories view including the complete item catalog
      //return data and how to display it

      catalog = { view: viewAddress, data: itemArray };
      return catalog;
  }
};

async function getAvg(arr) { //TODO:can use db aggregate functions to replace this
    let total = 0;
    arr.forEach(function (el) {
        total = total + el.rating;
    })
    return total / arr.length;

};

function isProfileItem(req) {
    let userProfile = req.session.currentProfile;
    if (userProfile) {
        for (let i = 0; i < userProfile.length; i++) {
            itemCode = userProfile[i].item.itemCode;
            if (itemCode == req.params.itemCode) {
                return true;
            }
        }
        return false;
    };
}

module.exports = router;
