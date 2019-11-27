// routes/index.js

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index.pug', { title: 'Auth0 Webapp sample Nodejs' });
});

//router.post('/form', (req,res,next) => {
//    let user_data = {
//        distance: req.body.distance,
//        travel_type: req.body.traveltype
//    };
//});

module.exports = router;
