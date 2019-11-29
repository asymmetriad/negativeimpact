//import mongoose, { Schema } from 'mongoose';
const db = require("../db");

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
  	required: '{PATH} is required!'}
}, {
  timestamps:true
});

module.exports.user = db.model('User',userSchema);
