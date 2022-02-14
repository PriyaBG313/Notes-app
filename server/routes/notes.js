const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = express.Router();
const dbo = require("../db/conn");
require ('../db/note.model');
const NoteModel = mongoose.model("Note");
var ObjectID = require('mongodb').ObjectID;

noteRoutes.route("/notes").post(function(req,res) {
    var note = new NoteModel();
    console.log(req.body);
    var myquery = { userID : req.body.userID};
    NoteModel.find(myquery, function(err, result) {
        if (err)
            console.log(err);
        else
        {
            //console.log(result);
            res.json(result);
        }
    })
})

noteRoutes.route("/note/add").post(function(req,res) {
    var newNote = new NoteModel();
    newNote.userID = (req.body.userID);
    newNote.title = req.body.noteTitle;
    newNote.body = req.body.noteBody;
    console.log(newNote);
    let db_connect = dbo.getDb("project1");
    
    newNote.save((err, doc) => {
        if (err)
        {
            console.log("error occured");
        }
    })
    
})

noteRoutes.route("/notes/update/:id").post(function(req,res) {
    let myquery = { _id : ObjectID(req.body.id)};
    let newvalues = {
        $set : {
            title : req.body.noteTitle,
            body : req.body.noteBody
        }
    }
    NoteModel.updateOne(myquery, newvalues, function(err, res) {
        if (err)
            throw err;
        else
        {
            console.log("1 document updated");
        }
    })
})

noteRoutes.route("/notes/delete/:id").post(function(req,res) {
    let myquery = { _id : ObjectID(req.body._id)};
    NoteModel.deleteOne(myquery, function (err) {
        if (err)
            console.log(err);
        else
            console.log("1 note deleted");
    })
})

noteRoutes.route("/notes/view/:id").post(function(req,res) {
    let myquery = { _id : ObjectID(req.body._id)};
    NoteModel.findOne(myquery,function(err, result) {
        if (err)
            console.log(err);
        else
        {
            //console.log(result);
            res.json(result);
        }
    })
})
module.exports = noteRoutes