const express = require('express');
const mustache = require('mustache-express');
const app = express();
const port = 3000;

let User = require('./model/user');

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => res.render('index.mustache', {hello: 'Welcome to Negative Impact!'}));


app.listen(port, () => console.log(`Negative Impact server listening on http://localhost:${port}!`));


app.get('/user', function(req,res){
  let user=new User({
    username:"username",
    password:"password"
  });
  user.save(function(err,user){
    res.send("Username: " + user.username + "\nPassword: " + user.password );
  })
});
