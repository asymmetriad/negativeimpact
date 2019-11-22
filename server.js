const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use("/public", express.static('./public/'));
// Loads jQuery as a static file, since it runs on the frontend.
app.use("/node_modules/jquery/dist/", express.static('./node_modules/jquery/dist/'));
app.use(bodyParser.json());
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.listen(port, () => console.log(`Negative Impact server listening on http://localhost:${port}!`));

//Router
app.use('/',require('./routes/index'));
app.use('/user',require('./routes/user'));

//mongodb model
let User = require('./model/user');
