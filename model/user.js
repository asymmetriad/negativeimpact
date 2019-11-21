//import mongoose, { Schema } from 'mongoose';
const db = require("../db");

const Schema = db.Schema;
const userSchema = new Schema({
    username: {type:String},
    password: {type:String},
    email: {type:String},
});

module.exports = db.model('User',userSchema);
