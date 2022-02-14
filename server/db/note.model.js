const mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
    userID: { 
        type: String,
        ref: "User"
    },
    title : {
        type : String 
    },
    body : {
        type : String
    }
})

mongoose.model("Note", NoteSchema)