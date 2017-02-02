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
        return done(null, false, {
          message: 'User not found'
        });
      }
      /* Check if password is valid */
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }

      /* If password correct return user object */
      return done(null, user);
    });
  }
));
