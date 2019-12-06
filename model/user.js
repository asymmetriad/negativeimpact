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

function addTripToUser (_id, trip_id, distance, pollution) {
  User.updateOne({_id:_id},{$push:{history:trip_id},$inc:{distance:distance},$inc:{pollution:pollution}});
}

function removeTripFromUser (_id,trip_id,distance,pollution) {
  User.updateOne({_id:_id},{$pull:{history:trip_id},$inc:{distance:-(distance)},$inc:{pollution:-(pollution)}});
}

module.exports.find_user = retrieveUser;
module.exports.addusertrip = addTripToUser;
module.exports.removeusertrip = removeTripFromUser;
