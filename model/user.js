//import mongoose, { Schema } from 'mongoose';
const db = require("../db");

const Schema = db.Schema;
const userSchema = new Schema({
    username: {type:String},
    password: {type:String},
    email: {type:String},
    history: {},
    rate: {type:Number}, // pollution rate
    totalMiles: {type:Number}, // total miles user travels
    numTravel: {type:Number}, // number of tiem user travels
    state: {type:String}
});

module.exports = db.model('User',userSchema);
