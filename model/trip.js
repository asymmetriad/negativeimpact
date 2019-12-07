const db = require("../db");
const envreq = require('dotenv').config();


const Schema = db.Schema;
const tripSchema = new Schema({
    user: {type:db.Schema.Types.ObjectId,
      ref: 'User'},
    start_addr: {type:String},
    end_addr: {type:String},
    method: {type:String},
    pollution: {type:Number},
    duration: {type:String}
}, {
  timestamps:true
});

module.exports.trip = db.model('Trip',tripSchema);

function retrieveTrips (user_id, callback) {
  var Trip = db.model('Trip',tripSchema);
  return Trip.find({user: user_id}, function(err, trips){
    if (err) {
      callback(err,null);
    }
    else {
      callback(null,trips);
    }
  });
}

module.exports.find_trips = retrieveTrips;
