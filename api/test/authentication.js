var rewire = require('rewire');

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var passport = require('passport');
var mongoose = require('mongoose');
var validator = require('validator');

require('../models/db');
var authentication = rewire('../controllers/authentication');

/* Dummy res that is passed in so we can view return values */
var fakeRes = {
  lastStatus: 0,
  lastJSON: {},

  status: function(statusID) {
    fakeRes.lastStatus = statusID;
  },
  json: function(jsonData) {
    fakeRes.lastJSON = jsonData;
  }
};

describe("Authentication Tests", function() {
  describe("User Register Tests", function() {

    /* Test to see whether a request with no body return 400 */
    it("No register info", function() {
      var fakeReq = {
        body: {

        }
      };

      /* Call our function to be testing */
      authentication.register(fakeReq, fakeRes);

      expect(fakeRes.lastStatus).to.equal(400);
      expect(fakeRes.lastJSON).to.eql({message: 'All fields required'});
    });

    /* Test to see whether a request with invalid email format */
    it("Invalid email format", function() {
      var fakeReq = {
        body: {
          name: 'Test Name',
          email: 'invalidemaildwjdwj',
          password: 'testpassword'
        }
      };

      /* Call our function to be testing */
      authentication.register(fakeReq, fakeRes);

      expect(fakeRes.lastStatus).to.equal(200);
      expect(fakeRes.lastJSON).to.eql({
        message: 'Please use a valid email address'
      });
    });

  });
});
