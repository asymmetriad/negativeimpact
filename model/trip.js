const db = require("../db");
const envreq = require('dotenv').config();


const Schema = db.Schema;
const tripSchema = new Schema({
    user: {type:db.Schema.Types.ObjectId,
      ref: 'User'},
    start_addr: {type:String},
    end_addr: {type:String},
    distance: {type:Number},
    method: {type:String},
    pollution: {type:Number}
}, {
  timestamps:true
});

// returns here session object for further use, to be called only once when application first loads
function new_here_session() {
  var platform = new H.service.Platform({'apikey' : process.env.HERE_API_KEY
  });
  return platform
}

function get_loc_geo(platform,address) {

}

function get_car_route(platform) {

}

function get_pub_transport_route(platform) {

}

function get_pedestrian_route(platform) {

}

function get_all_routes(platform) {

}

module.exports.trip = db.model('Trip',tripSchema);
