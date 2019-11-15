//const express = require('express');
//const router = express();
const router = require("../routes/index");
const User = require('../model/user');

//login Page
router.get('/login',(req,res) => res.render('login.mustache'));

//Register Page
router.get('/register',(req,res) => res.render('register.mustache'));

//Register Handle
router.post('/register',(req, res) => {
  let newUser = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });

  User.find({username:"jiachao"})
  .then(user =>{
    console.log(user);
    if (user.length>0){
      console.log("user: " + req.body.username + " already exist");
      res.send("Username already exist.");
    }
    else{
      newUser.save(function (err, user) {
        if (err) return console.error(err);
        else console.log("new user: " + user.username + " registered");
      });
      res.send('registered');
    }
  })
  .catch(err =>{
    res.send("error");
  })

});

module.exports = router;
