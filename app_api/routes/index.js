var config = require('../config/config');
var express = require('express');
var jwt = require('express-jwt');

var router = express.Router();

/* Variable for authentication using jwt */
var authJWT = jwt({
  secret: config.jwtSecret,
  userProperty: 'auth'
});

var contProfile = require('../controllers/profile');
var contAuth = require('../controllers/authentication');

/* Set routers for login/registration */

//TODO: Fix the / get request
//router.get('/', contAuth.login);

/* Profile viewing */
router.get('/profile', authJWT, contProfile.view);

/* User registration/login */
router.post('/login', contAuth.login);
router.post('/register', contAuth.register);

module.exports = router;
