
var mongoose = require('mongoose');

/* Create new MovieSchema. */
var MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

module.exports = MovieSchema;
