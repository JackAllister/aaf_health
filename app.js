var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

/* Requires for our models */
require('./app_api/models/db');
require('./app_api/config/passport');

var routerAPI = require('./app_api/routes/index');

var app = express();

/* Initialise the passport and let app use */
app.use(passport.initialize());

/* Set up the routing table for API */
app.use('/api', routerAPI);

/* Catch 404 errors and send to express handler */
app.use(function(req, res, next) {
  var err = new Error('Not found');
  err.status = 404;
  next(err);
});

/* Catch unauthorized errors */
app.use(function(req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message": err.name + ": " + err.message});
  }
});

module.exports = app;
