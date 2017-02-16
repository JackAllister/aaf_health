var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }

      /* Return nothing if user not found */
      if (!user) {
        console.log("Email " + username + " not found");
        return done(null, false, {
          message: 'Email not found'
        });
      }
      /* Check if password is valid */
      if (!user.validPassword(password)) {
        console.log("Password " + password + " is incorrect");
        return done(null, false, {
          message: 'Password is incorrect'
        });
      }

      /* If password correct return user object */
      return done(null, user);
    });
  }
));
