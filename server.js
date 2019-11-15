const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use("/public", express.static('./public/'));
app.use(bodyParser.json());
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
app.listen(port, () => console.log(`Negative Impact server listening on http://localhost:${port}!`));

//Router
app.use('/',require('./routes/index'));
app.use('/user',require('./routes/user'));

//mongodb model
let User = require('./model/user');

app.get('/userdata', function(req,res){
  let user=new User({
    username:"username",
      password:"password",
      distance_traveled: 3000,
      travel_type: "Car"
  });
  user.save(function(err,user){
    res.send("Username: " + user.username + "\nPassword: " + user.password + user.distance_traveled + user.travel_type);
  });
});
