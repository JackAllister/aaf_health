var chai = require("chai");
var expect = chai.expect;
var should = chai.should();

require('../models/db');
var activity = require("../controllers/activity");


/* Unit tests for activity controller */
describe("Activity Controller", function() {
  describe("Activity Viewer", function() {

    /* Test to check if no authID view returns false */
    it("View Activity with invalid authID", function() {
      var req = {
        auth: {
          /* Blank auth object */
        }
      };
      var res = {};

      expect(activity.view(req, res)).to.be.false;
    });

    /* Test to check if a valid authID on view returns true */
    it("View Activity with a valid authID", function() {
      var req = {
        auth: {
          /* Dummy token */
          _id: 'dija82hu2ua2fh2ua2fa2'
        },
        query: {

        }
      };
      var res = {};

      expect(activity.view(req, res)).to.be.true;
    });
  });
});
