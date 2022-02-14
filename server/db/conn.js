const mongoose = require('mongoose');
var _db;

module.exports = {
    connectToServer: function (callback) {
        mongoose.connect("mongodb://localhost:27017/project1", {useNewUrlParser : true, useUnifiedTopology : true}, function(error, client) {
        if (client)
        {
            _db = client;
            console.log("Database connected successfully")
        }
        return callback(error);
        });
    },

    getDb: function() {
        return _db;
    }
};

//const User = require("./user.model");