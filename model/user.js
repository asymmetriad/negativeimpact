const mongoose = require('mongoose');
let schema = mongoose.Schema;

let userSchema = new schema({
    username: String,
    password: String
});

mongoose.model('users',userSchema);
