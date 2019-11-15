const express = require('express');
const router = express.Router();

router.get('/',(req,res) => res.render('welcome.mustache',{hello: 'Welcome to Negative Impact!'}));

module.exports = router;
