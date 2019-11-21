const express = require('express');
const router = express.Router();

let travel_options = {
    options: [
        {value: 'Walk', text: 'Walk', selected: true},
        {value: 'Bicycle', text: 'Bicycle'},
        {value: 'Train', text: 'Train'},
        {value: 'Bus', text: 'Bus'},
        {value: 'Car', text: 'Car'},

    ]};

router.get('/',(req,res) => {
    res.render('index.mustache', travel_options);
});

router.post('/form', (req,res,next) => {
    let user_data = {
        distance: req.body.distance,
        travel_type: req.body.traveltype
    };
});

module.exports = router;
