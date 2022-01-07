const mongoose = require('mongoose');

class Database {

    constructor(url) {
        this.url = url;

        mongoose.connect(this.url, {
            useNewUrlParser: true
        });
    }



}

module.exports = Database;