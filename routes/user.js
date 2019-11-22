//const express = require('express');
//const router = express();
const router = require("../routes/index");
const User = require('../model/user');

//login Page
router.get('/login',(req,res) => {
    res.render('login.mustache');
});

//Register Page
router.get('/register',(req,res) => {
    res.render('register.mustache');
});

//Register Handle
router.post('/register',(req, res) => {
  let newUser = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });
if(findUser(User,{username:req.body.username})){
  console.log("user: " + req.body.username + " already exist");
  res.send("Username already exist.");
}
else{
  console.log("new user: " + user.username + " registered");
}


  /*User.find({username:"jiachao"})
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
*/
});

//Login Handle
router.post('/login',(req,res) =>{

});

function findUser(model,jsondata){
  model.find(jsondata)
  .then(result =>{
    if(result.length>0){
      console.log("data existed!");
      return true;
    }
    else{
      console.log("data doesn't existed!");
      return false;
    }
  })
  .catch(err =>{
    console.log(err);
    return false;
  });
}

module.exports = router;