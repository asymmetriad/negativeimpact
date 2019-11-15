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
    password: String,
    distance_traveled: Number,
    travel_type: String
});

let userInfo = mongoose.model("mongotst", userInfoSchema);
let user = new userInfo({ username: 'test' ,
                          password: 'password',
                          distance_traveled: 3000,
                          travel_type: 'Car'
                        });

console.log(user.username + "\n" + user.password + "\n" + user.distance_traveled + "\n" + user.travel_type);

user.save(function (err, user) {
    if (err) return console.error(err);
});
