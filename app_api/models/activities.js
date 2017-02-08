var mongoose = require('mongoose');

var activitySchema = new mongoose.Schema({
  title: {
    type: String,
    unique: false,
    required: true
  },
  uploadTime: {
    type: Date,
    unique: false,
    required: true
  },
  tripData: {
    type: String,
    unique: false,
    required: true
  },
  postedBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Activity', activitySchema);
