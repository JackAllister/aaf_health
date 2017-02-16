var rewire = require('rewire');

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

require('../models/db');
var activity = rewire('../controllers/activity');

/* Dummy variables */
var dummyID = 'FAKEJWTID';

/* Dummy functions to spoof procedures such as res.status */
var dummyFunction = function() {

}

/* Unit tests for activity controller */
describe("Activity Controller", function() {
  describe("Activity Adder", function() {

    /* Unit test to see if able to add activity with no info */
    it("Attemping to add activity with no info", function() {
      var req = {
        auth: {
          _id: dummyID
        },
        body: {

        }
      };
      var res = {
        status: dummyFunction,
        json: dummyFunction
      };

      expect(activity.addActivity(req, res)).to.be.false;
    });

  });

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
          _id: dummyID
        },
        query: {

        }
      };
      var res = {};

      expect(activity.view(req, res)).to.not.be.false;
    });


    it("Search Parser with no search params", function() {
      var req = {
        query: {

        }
      };

      /* Having to use rewire to access private function */
      var privParseSearchTerms = activity.__get__('parseSearchTerms');

      /* If no params we only want to return shared activities */
      var expected = {shared: true};

      expect(privParseSearchTerms(req)).to.eql(expected);
    });

    it("Search Parser with only userID specified", function() {
      var req = {
          auth: {
            _id: dummyID
          },
          query: {
            userID: 'me'
          }
      };

      var privParseSearchTerms = activity.__get__('parseSearchTerms');

      /* We should only get a search query for just postedBy */
      var expected = {postedBy: dummyID};

      expect(privParseSearchTerms(req)).to.eql(expected);
    });

  });
});
