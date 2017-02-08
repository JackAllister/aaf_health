var mongoose = require('mongoose');
var Activity = mongoose.model('Activity');

module.exports.addActivity = function(req, res) {

  /* Check to make sure authorized */
  if (req.auth._id) {
    console.log("Adding activity");
    console.log("UserID: " + req.auth._id);
    console.log("Title: " + req.body.title);
    console.log("Data: " + req.body.tripdata);

    /* Check to make sure all data filled in */
    if (!req.body.title || !req.body.tripdata) {
      res.status(400);
      res.json({
        "message": "All fields required"
      });
      return;
    }

    var activity = new Activity();
    /* Fill in data for new activity */
    activity.title = req.body.title;
    activity.tripData = req.body.tripdata;
    activity.uploadTime = new Date();
    activity.postedBy = req.auth._id;

    /* Save to database */
    activity.save(function(err) {
      res.status(200);
      res.json({
        "message": "Activity added."
      });
    });
  }
};

module.exports.viewAll = function(req, res) {

  //TODO: Maybe add some logging/tests for when not true?
  if (req.auth._id) {
    Activity.find({})
      .exec(function(err, activity) {
        res.status(200).json(activity);
      });
  }
};
