var mongoose = require('mongoose');

var Activity = mongoose.model('Activity');
var User = mongoose.model('User');

/* Add a new activity */
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
      res.json({"message": "All fields required."});
      return;
    }

    var activity = new Activity();
    /* Fill in data and save new activity */
    activity.title = req.body.title;
    activity.tripData = req.body.tripdata;
    activity.time = new Date();
    activity.postedBy = req.auth._id;
    activity.save();

    res.status(200);
    res.json({"message": "Activity added."});
  }
};

/* Update a current activity */
module.exports.updateActivity = function(req, res) {

  /* Check to make sure authorized */
  if (req.auth._id) {
    console.log("Updating activity");
    console.log("UserID: " + req.auth._id);
    console.log("ActivityID: " + req.body.id);
    console.log("Title: " + req.body.title);

    /* Check to make sure all data filled in */
    if (!req.body.title || !req.body.id) {
      res.status(400);
      res.json({"message": "All fields required."});
      return;
    }

    /* Update activity in database */
    Activity.findById(req.body.id).exec(function(err, activity) {
      if (activity != null)
      {
        if (activity.postedBy == req.auth._id)
        {
          if ((err === null)) {
            /* Update activity if found */
            activity.title = req.body.title;
            activity.save();
            res.status(200);
            res.json({"message": "Activity updated."});
          } else {
            /* Indicate error updating activity */
            res.status(400);
            res.json({"message": "Error updating activity."});
          }
        } else {
          res.status(400);
          res.json({"message": "Cannot update other users activity."});
        }
      } else {
        res.status(400);
        res.json({"message": "Invalid activity ID."});
      }
    });
  }
};

/* Remove an activity */
module.exports.removeActivity = function(req, res) {

  /* Check to make sure authorized */
  if (req.auth._id) {
    console.log("Deleting activity");
    console.log("UserID: " + req.auth._id);
    console.log("ActivityID: " + req.body.id);

    /* Check to make sure all data filled in */
    if (!req.body.id) {
      res.status(400);
      res.json({"message": "All fields required."});
      return;
    }

    /* Delete activity from database */
    Activity.findById(req.body.id).exec(function(err, activity) {
      if ((activity != null) && (err === null)) {
        if (activity.postedBy == req.auth._id) {
          activity.remove();
          res.status(200);
          res.json({"message": "Activity deleted."});
        } else {
          res.status(400);
          res.json({"message": "Cannot delete other users activity."});
        }
      } else {
        res.status(400);
        res.json({"message": "Invalid activity ID."});
      }
    });
  }
};

/* Lists all activities */
module.exports.view = function(req, res) {

  if (req.auth._id) {

    var searchQuery = {};

    /* Check to see if searching with userID */
    if (req.query.userID) {
      if (req.query.userID == 'me') {
        /* If searching for own activities */
        searchQuery.postedBy = req.auth._id;
      } else {
        var userIDRegExp = new RegExp('^' + req.query.userID, 'i');
      }
    }

    /* Check to see if searching with actID */
    if (req.query.actID) {
      searchQuery._id = new RegExp('^' + req.query.actID, 'i');
    }

    /* Check to see if searching with title */
    if (req.query.title) {
      searchQuery.title = new RegExp('^' + req.query.title, 'i');
    }

    /* Check to see if searching with time */
    if (req.query.time) {
      searchQuery.time = new RegExp('^' + req.query.time, 'i');
    }

    /* Find matching activities using search procedure */
    Activity.find(searchQuery)
      .exec(function(err, activities) {

        var result = [];

        /* Loop through and only send needed data */
        for (activity of activities) {

          /* Fill in our act data information */
          var actData = {
            "actID": activity._id,
            "postedBy": activity.postedBy,
            "time": activity.time,
            "title": activity.title,
            "tripData": activity.tripData,
          };

          User.findById(activity.postedBy)
            .exec(function(err, user) {
              if (user != null) {
                actData.postedByName = user.name;
              }
              readyToAdd = true;
            });

          result.push(actData);
        }

        res.status(200);
        res.json(result);
      });
  }
};
