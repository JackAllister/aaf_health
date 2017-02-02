var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

/* Create the application */
var app = express();

var SERVER_PORT = 3000;

/* Add middleware for REST API's */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

/* CORS Support for REST interfaces */
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

/* Conecct to MongoDB */
mongoose.connect('mongodb://localhost/aaf-health');
mongoose.connection.once('open', function() {

  /* Add the require models */
  app.models = require('./models/index');

  /* Load the routes */
  var routes = require('./routes');
  _.each(routes, function(controller, route) {
    app.use(route, controller(app, route));
  });

  console.log('Listening on port 3000...');
  app.listen(SERVER_PORT);
});
