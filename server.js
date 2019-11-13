const express = require('express');
const mongoose = require('mongoose');
const mustache = require('mustache-express');
const app = express();
const port = 3000;

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => res.render('index.mustache', {hello: 'Welcome to Negative Impact!'}));


app.listen(port, () => console.log(`Negative Impact server listening on http://localhost:${port}!`));

mongoose.connect('mongodb://localhost/negativeimpact', {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to MongoDB Negative Impact database.");
});

let mongoTestSchema = new mongoose.Schema({
    name: String
});

let mongotest = mongoose.model("mongotest", mongoTestSchema);
let mangos = new mongotest({ name: 'mangos' });

console.log(mangos.name);

mangos.save(function (err, mangos) {
    if (err) return console.error(err);
});
