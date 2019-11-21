const express = require('express');
const router = express.Router();

router.get('/',(req,res) => res.render('index.mustache',{hello: 'Welcome to Negative Impact!'}));

module.exports = router;
