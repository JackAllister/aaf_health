var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.register = function(req, res) {

  var user = new User();

  /* If invalid data sent, send bad request status */
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.status(400);
    res.json({
      "message": "All fields required"
    });
    return;
  }

  console.log("User registering");
  console.log("Name: " + req.body.name);
  console.log("Email: " + req.body.email);
  console.log("Password: " + req.body.password);

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function(err) {
    var token = user.generateJwt();

    res.status(200);
    res.json({
      "token": token
    });
  });
};

module.exports.login = function(req, res) {
  console.log("Logging in user: " + req.body.email);
  res.status(200);
  res.json({
    "message" : "User logged in: " + req.body.email
  });
};
