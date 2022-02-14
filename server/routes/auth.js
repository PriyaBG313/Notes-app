const express = require('express');
const mongoose = require('mongoose');
const authRoutes = express.Router();
const dbo = require("../db/conn");
require ('../db/user.model');
const UserModel = mongoose.model("User");
var ObjectID = require('mongodb').ObjectID;

authRoutes.route("/signup").post(function(req, res){

    //console.log(req.body);
    var newuser = new UserModel();
    newuser.username = req.body.username;
    newuser.password = req.body.password;
    var taken =false;
    let db_connect = dbo.getDb("project1");
    var myquery = { username : req.body.username};
    UserModel.findOne(myquery, function(err, user){
        if (err) console.log(err);
        else {
            //console.log(user);
            if (user!==null)
            {
                taken = true;
            }
            //console.log(taken);
            res.json(user);
            if (taken=== false) {
                console.log("new user detected");
                newuser.save((err, doc) => {
                    if (err)
                    {
                        res.send("error occured")
                    }
                })
            }
        }
    })    
});

authRoutes.route("/getID").post(function(req, res) {
    //console.log(req.body);
    var myquery = { username : req.body.username}
    UserModel.findOne(myquery, function(err, user) {
        if (err)
            console.log(err);
        else
        {
            //console.log(user);
            res.json(user);
        }
    })
})

authRoutes.route("/login").post(function(req, res) {
    let db_connect = dbo.getDb("project1");
    var myquery = { $and : [{username : req.body.username},
                            {password : req.body.password}]
                  };
    UserModel.findOne(myquery, function(err, user){
        if (err) console.log(err);
        else {
            //console.log(user);
            res.json(user);
        }
    })
})

authRoutes.route("/searchuser").post(function(req, res){

    //console.log(req.body);
    var newuser = new UserModel();
    newuser.username = req.body.username;
    newuser.password = req.body.password;
    var myquery = { username : req.body.username};
    UserModel.findOne(myquery, function(err, user){
        if (err) console.log(err);
        else {
            res.json(user);
        }
    });
});

authRoutes.route("/editprofile").post(function(req,res) {
    //console.log(req.body);
    let newuser = {
        $set : {
            username : req.body.username,
            password : req.body.password
        }
    }
    var myquery = { _id : ObjectID(req.body.userID)};
    UserModel.updateOne(myquery, newuser, function(err, user){
        if (err) console.log(err);
        else {
            console.log("1 user updated");
            //console.log(taken);
            //res.json(user);
        }
    });
})

module.exports = authRoutes