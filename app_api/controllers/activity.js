var mongoose = require('mongoose');
var Activity = mongoose.model('Activity');

module.exports.viewAll = function(req, res) {

  //TODO: Maybe add some logging/tests for when not true?
  if (req.auth._id)
  {
    Activity.find({})
      .exec(function(err, activity) {
        res.status(200).json(activity);
      });
  }

};
