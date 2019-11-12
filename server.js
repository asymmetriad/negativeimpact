const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Negative Impact Server Go!'));

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
