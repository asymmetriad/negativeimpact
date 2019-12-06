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
  var User = user.user;
  var find_user = user.find_user;
  var find_trips = trip.find_trips;
  User.countDocuments({auth0_id:userProfile.user_id}, function (err, count){
    if(count>0){
      find_user(userProfile.user_id,function(error,user){
        if (error) {
          console.log(error);
        }
        find_trips(user._id,function(error1,trips){
          if(error1) {
            console.log(error1);
          }
          res.render('home.pug', {
            user: user,
            trips: trips
          });
        });
      });
    }
    else {
      res.redirect('/user/continue');
    }
  });
});

router.get('/user/continue',secured(), function (req, res, next) {
  res.render('continue.pug');
});

router.post('/users/fsignup',secured(), function (req, res, next){
  const { _raw, _json, ...userProfile } = req.user;
  User = user.user;
  console.log(req.body);
  var initiate = new User(req.body);
  initiate.auth0_id = userProfile.user_id;
  initiate.pollution = 0;
  initiate.save();
  res.redirect('/user');
});

router.get('/newtrip',secured(), function (req, res, next) {
  res.render('newtrip.pug');
});

router.get('/tripdetails',secured(),function(req,res,next){
  const startstop = req.query;
  res.render('choose.pug', {startstop:startstop});
});

router.get('/savetrip',secured(),function(req,res,next){
  const { _raw, _json, ...userProfile } = req.user;
  console.log(req.user);
  res.redirect('/user');
});

router.get('/viewtrips',secured(),function(req,res,next){
  find_user(userProfile.user_id,function(error,user){
    if (error) {
      console.log(error);
    }
    find_trips(user._id,function(error1,trips){
      if(error1) {
        console.log(error1);
      }
      res.render('viewtrips.pug', {
        user: user,
        trips: trips
      });
    });
  });
});

router.post('/deletetrip/:tripid',secured(),function(req,res,next){

});

module.exports = router;
