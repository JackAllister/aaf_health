var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.view = function(req, res) {

  /* Check to make sure authorized */
  if (req.auth._id) {

    /* Check to see if searching for self or other ID */
    if (req.query.userID) {
      if (req.query.userID == 'me') {
        var searchID = req.auth._id;
      } else {
        var searchID = req.query.userID;
      }

      /* Search to see if a valid ID exists */
      User.findById(searchID)
        .exec(function(err, user) {
          if (user != null) {
            console.log("Viewed user profile: " + user.email);
            res.status(200);
            res.json({
              "email": user.email,
              "name": user.name
            });
          } else {
            res.status(400);
            res.json({"message": "User not found."});
          }
        });

    } else {
      res.status(400);
      res.json({"message": "No user ID supplied."});
    }
  }
};

module.exports.update = function(req, res) {

  /* Check to make sure authorized */
  if (req.auth._id) {
    console.log("Updating user");
    console.log("UserID: " + req.auth._id);
    console.log("Name: " + req.body.name);
    console.log("Email: " + req.body.email);
    console.log("Password: " + req.body.password);


    /* Check to make sure all fields have data */
    if (!req.body.name || !req.body.email || !req.body.password) {
      res.status(400);
      res.json({"message": "All fields required."});
      return;
    }

    /* Find user by _id */
    User.findById(req.auth._id).exec(function(err, user) {
      if (user != null && err === null) {

        /* Update user information */
        user.name = req.body.name;
        user.email = req.body.email;
        user.setPassword(req.body.password);
        user.save();

        res.status(200);
        res.json({"message": "User information updated."});
      } else {
        res.status(400);
        res.json({"message": "Invalid user ID."});
      }
    });
  }
}
