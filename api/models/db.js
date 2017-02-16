/* Requires for database */
var mongoose = require('mongoose');

var config = require('../config/config');

mongoose.connect(config.dbURI);
mongoose.Promise = global.Promise

/* Some debugging to indicate when database connected */
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + config.dbURI);
});


/* Add in all required schemas */
require('./users');
require('./activities');
require('./comments');
