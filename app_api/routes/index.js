var express = require('express');

var jwt = require('express-jwt');
var router = express.Router();

var contProfile = require('../controllers/profile');
var contAuth = require('../controllers/authentication');

router.get('/', contProfile.register);

module.exports = router;
