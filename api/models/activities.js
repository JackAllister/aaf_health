var mongoose = require('mongoose');

var activitySchema = new mongoose.Schema({
  title: {
    type: String,
    unique: false,
    required: true
  },
  time: {
    type: Date,
    unique: false,
    required: true
  },
  routeName: {
    type: String,
    unique: false,
    required: false
  },
  routeLoc: {
    type: Object,
    index: '2dsphere',
    unique: false,
    required: false
  },
  shared: {
    type: Boolean,
    unique: false,
    required: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

activitySchema.virtual("geoJSON").get(function() {
  var feature = {
    type: "Feature",
    geometry: this.routeLoc,
    properties: {
      name: this.routeName
    }
  };

  var resp = {
    type: "FeatureCollection",
    features: [feature]
  };
  return resp;
});

activitySchema.virtual("geoJSON").set(function(json) {
  var feature = json.features[0];
  this.routeName = feature.properties.name;

  return this.routeLoc = feature.geometry;
});

module.exports = mongoose.model('Activity', activitySchema);
