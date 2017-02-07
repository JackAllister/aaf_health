var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.view = function(req, res) {

  if (!req.auth._id) {
    /* If no valid ID exists in JWT */
    console.log("Attempted to view profile with invalid ID");

    res.status(401).json({
      "message": "UnauthorizedError: invalid ID"
    });

  } else {
    /* If a valid ID exists in the JWT */
    User.findById(req.auth._id)
      .exec(function(err, user) {

        console.log("Viewed user profile: " + user.email);
        res.status(200).json({
          "email": user.email,
          "name": user.name
        });
      });
  }
};
