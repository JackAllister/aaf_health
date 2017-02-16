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
    activity.shared = false;
    activity.postedBy = req.auth._id;
    activity.save();

    res.status(200);
    res.json({"message": "Activity added."});
  }
};

/* Function for toggling shared activity */
module.exports.toggleShareActivity = function(req, res) {

  /* Check to make sure authorized */
  if (req.auth._id) {
    console.log("Sharing activity");
    console.log("UserID: " + req.auth._id);
    console.log("ActID: " + req.body.id);

    /* Check to make sure all data filled in */
    if (!req.body.id) {
      res.status(400);
      res.json({"message": "Activity ID required."});
      return;
    }

    Activity.findById(req.body.id).exec(function(err, activity) {
      if (activity != null)
      {
        if (activity.postedBy == req.auth._id)
        {
          if ((err === null)) {
            /* Update activity if found */
            activity.shared = !activity.shared;
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
          res.json({"message": "Cannot share other users activity."});
        }
      } else {
        res.status(400);
        res.json({"message": "Invalid activity ID."});
      }
    });

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
    console.log("Trip Data: " + req.body.tripdata);

    /* Check to make sure all data filled in */
    if (!req.body.title || !req.body.id || !req.body.tripdata) {
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
            activity.tripData = req.body.tripdata;
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

function parseSearchTerms(req) {

  var searchQuery = {};

  /* Check to see if searching with userID */
  if (req.query.userID) {
    if (req.query.userID == 'me' || req.query.userID == req.auth._id) {
      /* If searching for own activities */
      searchQuery.postedBy = req.auth._id;

    } else {
      searchQuery.postedBy = new RegExp('^' + req.query.userID, 'i');

      /* If not viewing own activities limit to shared  */
      searchQuery.shared = true;
    }
  } else {
    /* Only show shared as no userID was provided */
    searchQuery.shared = true;
  }

  /* Check to see if searching with actID */
  if (req.query.actID) {
    searchQuery._id = req.query.actID;
  }

  /* Check to see if searching with title */
  if (req.query.title) {
    searchQuery.title = new RegExp('^' + req.query.title, 'i');
  }

  /* Check to see if searching with time */
  if (req.query.time) {
    searchQuery.time = new RegExp('^' + req.query.time, 'i');
  }

  /* Check to see if only shared */
  if (req.query.shared) {
    searchQuery.shared = true;
  }

  return searchQuery;
}

/* Lists all activities */
module.exports.view = function(req, res) {

  /* Check to make sure authorized */
  if (req.auth._id) {

    var searchQuery = parseSearchTerms(req);

    console.log("Viewed activites with params: ");
    console.log(searchQuery);

    /* Find matching activities using search procedure */
    Activity.find(searchQuery)
      .exec(function(err, activities) {

        var result = [];

        if (activities != null) {
          /* Loop through and only send needed data */
          for (activity of activities) {

            /* Fill in our act data information */
            var actData = {
              "actID": activity._id,
              "postedBy": activity.postedBy,
              "time": activity.time,
              "title": activity.title,
              "tripData": activity.tripData,
              "shared": activity.shared
            };

            result.push(actData);
          }
        }

        res.status(200);
        res.json(result);
      });
  }
};
