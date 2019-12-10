//import mongoose, { Schema } from 'mongoose';
const db = require("../db");
const trip = require("./trip")
const Trip = trip.trip
const Schema = db.Schema;
const userSchema = new Schema({
    auth0_id: {type:String,
  	   required: '{PATH} is required!'},
    history: [
      { type: db.Schema.Types.ObjectId, ref: 'Trip' }
    ],
    //rate: {type:Number}, // pollution rate
    //totalMiles: {type:Number}, // total miles user travels
    //numTravel: {type:Number}, // number of tiem user travels
    state: {type:String,
  	required: '{PATH} is required!'},
    pollution: {type:Number},
    distance: {type:Number}
}, {
  timestamps:true
});

module.exports.user = db.model('User',userSchema);

function retrieveUser (auth0_id, callback) {
  var User = db.model('User',userSchema);
  User.findOne({auth0_id: auth0_id}, function(err, user){
    if (err) {
      callback(err,null);
    }
    else {
      callback(null,user);
    }
  });
}

function callItBack () {
  console.log("Trip sucessfully added to user history");
}

function addTripToUser (user_id, trip_id, pollution , distance) {
  var User = db.model('User',userSchema);
  console.log(pollution);
  User.findByIdAndUpdate(user_id,{$push:{history:trip_id},$inc:{pollution:pollution}},callItBack);
  User.findByIdAndUpdate(user_id,{$inc:{distance:distance}},callItBack);
}

function removeTripFromUser (user_id,trip_id,distance,pollution, distance) {
  var User = db.model('User',userSchema);
  User.findByIdAndUpdate(user_id,{$pull:{history:trip_id},$inc:{pollution:-(pollution)},$inc:{distance:-(distance)}},callItBack);
}

module.exports.find_user = retrieveUser;
module.exports.addusertrip = addTripToUser;
module.exports.removeusertrip = removeTripFromUser;
