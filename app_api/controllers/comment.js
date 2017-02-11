var mongoose = require('mongoose');

var Comment = mongoose.model('Comment');
var Activity = mongoose.model('Activity');
var User = mongoose.model('User');

module.exports.addComment = function(req, res) {

  /* Check to make sure authorized */
  if (req.auth._id) {
    console.log("Adding comment");
    console.log("UserID: " + req.auth._id);
    console.log("ActID: " + req.body.act_id);
    console.log("comment: " + req.body.comment);
    console.log("url: " + req.body.url);

    /* Check to make sure all data filled in */
    if (!req.body.act_id || !req.body.comment) {
      res.status(400);
      res.json({"message": "All fields required."});
      return;
    }

    /* Find activity comment relates to */
    Activity.findById(req.body.act_id).exec(function(err, activity) {
      if ((activity != null) && (err === null)) {

        /* Create our new comment object */
        var comment = new Comment();
        comment.comment = req.body.comment;
        comment.time = new Date();
        comment.url = req.body.url;
        comment.postedBy = req.auth._id;
        comment.activityID = req.body.act_id;
        comment.save();

        res.status(200);
        res.json({"message": "Comment added."});
      } else {
        res.status(400);
        res.json({"message": "Invalid activity ID."});
      }
    });
  }
};

/* Lists all comments */
module.exports.viewAll = function(req, res) {

  if (req.auth._id) {
    Comment.find({})
      .exec(function(err, comment) {
        res.status(200).json(comment);
      });
  }
};
