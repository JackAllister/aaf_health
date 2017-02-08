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
var contActivity = require('../controllers/activity');
var contAuth = require('../controllers/authentication');

/* Set routers for login/registration */

//TODO: Fix the / get request
//router.get('/', contAuth.login);

/* Profile related routes */
router.get('/profile', authJWT, contProfile.view);

/* Activity related routes */
router.get('/activity', authJWT, contActivity.viewAll);
router.post('/activity/add', authJWT, contActivity.addActivity);
router.post('/activity/update', authJWT, contActivity.updateActivity);
router.post('/activity/remove', authJWT, contActivity.removeActivity);

/* User registration/login routes */
router.post('/login', contAuth.login);
router.post('/register', contAuth.register);

module.exports = router;
