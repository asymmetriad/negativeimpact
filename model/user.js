//import mongoose, { Schema } from 'mongoose';
let db = require("../db");

let Schema = db.Schema;
let userSchema = new Schema({
    username: String,
    password: String
});

let User = db.model('User',userSchema);
module.exports = User;
