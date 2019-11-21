const express = require('express');
const mustache = require('mustache-express');
const app = express();
const port = 3000;

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

let travel_options = {
    options: [
        {value: 'Walk', text: 'Walk', selected: true},
        {value: 'Bicycle', text: 'Bicycle'},
        {value: 'Train', text: 'Train'},
        {value: 'Bus', text: 'Bus'},
        {value: 'Car', text: 'Car'},

    ]};

app.get('/', (req, res) => {
    res.render('index.mustache', travel_options);
});

app.post('/form', (req,res,next) => {
    let user_data = {
        distance: req.body.distance,
        travel_type: req.body.traveltype
    };
    console.log(req.body);
    res.send();
});


app.listen(port, () => console.log(`Negative Impact server listening on http://localhost:${port}!`));
