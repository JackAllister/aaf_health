var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

/* Require our database and passport models */
require('./models/db');
require('./config/passport');

/* Include our router */
var routerAPI = require('./routes/index');

/* Create a new instance of express */
var app = express();

var webPort = 3000;

/* Set up our body parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

/* Initialise the passport and let app use */
app.use(passport.initialize());

/* Allow cross origin requests (from our front end) */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

/* Set up the routing table for API */
app.use('/api', routerAPI);

/* Catch 404 errors and send to express handler */
app.use(function(req, res, next) {
  console.log("Error 404: " + req.method + " {" + req.url + "}");
  res.status(404);
  res.json({
    "message": "Page not found"
  });
});

app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    console.log("Error 401: " + req.method + " {" + req.url + "}");
    console.log("Token: ", req.header.authtoken);
    res.status(401);
    res.json({
      "message": err.name + ": " + err.message
    });
  }
});

/* Make our web server listen on specified port */
console.log("Listening on port: " + webPort);
app.listen(webPort);

module.exports = app;
