// routes/users.js

var express = require('express');
var db = require('../db');
var user = require('../model/user');
var trip = require('../model/trip');
var secured = require('../lib/middleware/secured');
var router = express.Router();

/* GET user profile. */
router.get('/user', secured(), function (req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  User = user.user;
  User.countDocuments({auth0_id:userProfile.user_id}, function (err, count){
    if(count>0){
      res.render('home.pug', {
        userProfile: JSON.stringify(userProfile, null, 2),
        title: 'Profile page'
      });
    }
    else {
      res.redirect('/user/continue');
    }
  });
});

router.get('/user/continue',secured(), function (req, res, next) {
  res.render('continue.pug', {title:'Finish Signing Up'});
});

router.post('/users/fsignup',secured(), function (req, res, next){
  const { _raw, _json, ...userProfile } = req.user;
  User = user.user;
  var initiate = new User(req.body);
  initiate.auth0_id = userProfile.user_id;
  initiate.save();
  res.redirect('/user');
});


module.exports = router;
