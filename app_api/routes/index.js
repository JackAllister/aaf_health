var express = require('express');

var jwt = require('express-jwt');
var router = express.Router();

var contProfile = require('../controllers/profile');
var contAuth = require('../controllers/authentication');

/* Set routers for login/registration */

//TODO: Fix the / get request
//router.get('/', contAuth.login);

router.post('/login', contAuth.login);
router.post('/register', contAuth.register);

module.exports = router;
