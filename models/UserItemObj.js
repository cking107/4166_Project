class UserItemObj {
    constructor(item, rating, listened) {
        this.item = item;
        this.rating = rating;
        this.listened = listened;
    }
    setItem(item) {
        this.item = item;
    };
    getItem() {
        return this.item;
    }

    setRating(rating) {
        this.rating = rating;
    }

    getRating() {
        return rating;
    }

    setListened(listened) {
        this.listened = listened;
    }

    getListened() {
        return this.listened;
    }

}
module.exports = UserItemObj;
