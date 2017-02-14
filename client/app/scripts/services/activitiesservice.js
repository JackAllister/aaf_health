'use strict';

/**
 * @ngdoc service
 * @name clientApp.activitiesService
 * @description
 * # activitiesService
 * Service in the clientApp.
 */
angular.module('clientApp')
  .service('activitiesService', function () {

    /* Private variables */

    /* Public variables */
    return {
      /* Gets users activities using http request */
      getUserActivities: function(callback) {
        var debugData = [
          {"poster": "Jack", "time": new Date(), "title": "Test 1", "data": "testdata1"},
          {"poster": "Jack", "time": new Date(), "title": "Test 2", "data": "testdata2"},
          {"poster": "Jack", "time": new Date(), "title": "Test 3", "data": "testdata3"},
          {"poster": "Jack", "time": new Date(), "title": "Test 1", "data": "testdata1"},
          {"poster": "Jack", "time": new Date(), "title": "Test 2", "data": "testdata2"},
          {"poster": "Jack", "time": new Date(), "title": "Test 3", "data": "testdata3"},
          {"poster": "Jack", "time": new Date(), "title": "Test 1", "data": "testdata1"},
          {"poster": "Jack", "time": new Date(), "title": "Test 2", "data": "testdata2"},
          {"poster": "Jack", "time": new Date(), "title": "Test 3", "data": "testdata3"}
        ];
        callback(true, debugData);
      }
    }
  });
