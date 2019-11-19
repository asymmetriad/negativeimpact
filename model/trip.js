const db = require("../db");

const Schema = db.Schema;
const tripSchema = new Schema({
    username: {type:String},

});

module.exports = db.model('User',tripSchema);
