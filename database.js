const mongoose = require('mongoose');

//create connection to database
mongoose.connect('mongodb://localhost/negativeimpact', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});
let db = mongoose.connection;

//conection fail
db.on('error', console.error.bind(console, 'connection error:'));

//conection sucessuces
db.once('open', function() {
    console.log("Connected to MongoDB Negative Impact database.");
});

//
let userInfoSchema = new mongoose.Schema({
    username: String,
    password: String
});

let userInfo = mongoose.model("mongotest", userInfoSchema);
let user = new userInfo({ username: 'test' ,
                             password: 'password'});

console.log(user.username + "\n" + user.password);

user.save(function (err, user) {
    if (err) return console.error(err);
});
