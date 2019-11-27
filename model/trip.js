const db = require("../db");

const Schema = db.Schema;
const tripSchema = new Schema({
    username: {type:String},

});

// returns here session object for further use
function new_here_session() {

}

function get_loc_geo() {

}

function get_car_route() {

}

function get_pub_transport_route() {

}

function get_pedestrian_route() {

}

function get_all_routes() {

}

module.exports = db.model('User',tripSchema);
