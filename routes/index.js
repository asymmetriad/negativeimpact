const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.render('index.mustache');
});

router.post('/form', (req,res,next) => {
    let user_data = {
        distance: req.body.distance,
        travel_type: req.body.traveltype
    };
});

module.exports = router;
