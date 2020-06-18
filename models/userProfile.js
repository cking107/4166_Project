let UserItemDB = require('../utility/UserItemDB');

class UserProfile {
  constructor(userItems) {
    this.userItems = userItems;
  }

  setItems(profileItems) {
    this.userItems = profileItems;
  }

  async addItem(theUser, itemCode) {
    //adding item to list.
    // add validation to ensure unique items are added
    console.log("adding item to ");
    console.log(itemCode);
    // const data = itemFeedbackDB.addItem(db,userID, userItem);
    await UserItemDB.addItem(theUser, itemCode);
    //console.log(data);
    this.userItems = await UserItemDB.selectUserItems(theUser);
    console.log("here " + this.userItems);
  }

  removeItem(theUser, itemID) {
    //using creation date as unique key to fortunes in list
    let index = -1;
    console.log("length before delete :" + this.userItems.length);
    console.log("userItems before delete :" + this.userItems);

    for (let i = 0; i < this.userItems.length; i++) {
      console.log(this.userItems[i]);
      if (this.userItems[i].item.itemCode == itemID) {
        index = i;
        break;
      }
    }
    if (index != -1) {
      console.log("found item to delete")
      this.userItems.splice(index, 1);

    }

    console.log("index " + index);
    console.log(this.userItems);
    console.log("length after delete :" + this.userItems.length);

  }

  async updateItemRating(userItem, theUser) {
    for (let i = 0; i < this.userItems.length; i++) {
        if (this.userItems[i].item.itemCode == userItem.item.itemCode) {
            this.userItems[i].rating = userItem.rating;
            await UserItemDB.updateItemRating(theUser, userItem.item.itemCode, userItem.rating);
            console.log("rating updated");
            return;
        }
    }

  }

  async updateItemFlag(userItem, theUser) {
    //console.log("in update item rating. user profile size : "+this.userItems.length);
    for (let i = 0; i < this.userItems.length; i++) {
      // console.log("here");
      if (this.userItems[i].item.itemCode == userItem.item.itemCode) {
        this.userItems[i].listened = userItem.listened;
        await UserItemDB.updateItemFlag(theUser, userItem.item.itemCode, userItem.listened);
        return;
      }
    }
  }

  //getters
  getItems() {
    return this.userItems;
  }

}

module.exports = UserProfile;
