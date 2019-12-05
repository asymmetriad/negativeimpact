const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
let session = require('express-session');
// Load Passport
let passport = require('passport');
let Auth0Strategy = require('passport-auth0');
let userInViews = require('./lib/middleware/userInViews');


require('./db');

require('express-async-errors');
// Load environment letiables from .env
let dotenv = require('dotenv');
const app = express();
const port = 3000;

dotenv.config();

// static load public folder
app.use(express.static('public'));

// Loads jQuery as a static file, since it runs on the frontend.
app.use("/node_modules/jquery/dist/", express.static('./node_modules/jquery/dist/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('mustache', mustache());
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.listen(port, () => console.log(`Negative Impact server listening on http://localhost:${port}!`));

let authRouter = require('./routes/auth');
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

// config express-session
let sess = {
  secret: process.env.CUST_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true
};

if (app.get('env') === 'production') {
  // Use secure cookies in production (requires SSL/TLS)
  sess.cookie.secure = false;

  // Uncomment the line below if your application is behind a proxy (like on Heroku)
  // or if you're encountering the error message:
  // "Unable to verify authorization request state"
  // app.set('trust proxy', 1);
}


app.use(session(sess));


// Configure Passport to use Auth0
let strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
    process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

passport.use(strategy);

app.use(passport.initialize());
app.use(passport.session());

app.use(userInViews());
app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/', usersRouter);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

//mongodb model
let User = require('./model/user');
let Trip = require('./model/trip');
