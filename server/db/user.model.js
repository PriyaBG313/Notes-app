const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : "Required"
    },
    password : {
        type : String,
        required : "Required"
    }
})

mongoose.model("User", UserSchema);