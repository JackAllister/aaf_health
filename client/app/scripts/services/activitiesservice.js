'use strict';

/**
 * @ngdoc service
 * @name clientApp.activitiesService
 * @description
 * # activitiesService
 * Service in the clientApp.
 */
angular.module('clientApp')
  .service('activitiesService', function (apiURL, $http) {

    /* Private variables */

    /* Public variables */
    return {

      /* Gets activities using http request, supports search params */
      getActivities: function(searchParams, callback) {
        $http({
          method: 'GET',
          url: apiURL + '/activity',
          params: searchParams
        }).then(function(response) {
          /* Success */
          if (response.data) {
            callback(true, response.data);
          }
        }, function(response) {
          /* Error */
          if (response.data && response.data.message) {
            callback(false, response.data.message);
          } else {
            callback(false, 'Error getting activities.');
          }
        });
      },

      /* Function for adding a new activity */
      addActivity: function(title, tripData, callback) {
        $http({
          method: 'POST',
          url: apiURL + '/activity/add',
          data: {'title': title, 'tripdata': tripData}
        }).then(function(response) {
          /* Success */
          if (response.data && response.data.message) {
            callback(true, response.data.message);
          } else {
            callback(false, 'Unable to add activity.');
          }
        }, function(response) {
          /* Error */
          if (response.data && response.data.message) {
            callback(false, response.data.message);
          } else {
            callback(false, 'Unable to add activity.');
          }
        });
      },

      /* Function to remove an activity */
      removeActivity: function(actID, callback) {
        $http({
          method: 'POST',
          url: apiURL + '/activity/remove',
          data: {id: actID}
        }).then(function(response) {
          /* Success */
          if (response.data && response.data.message) {
            callback(true, response.data.message);
          } else {
            callback(false, 'Unable to remove activity.');
          }
        }, function(response) {
          /* Error */
          if (response.data && response.data.message) {
            callback(false, response.data.message);
          } else {
            callback(false, 'Unable to remove activity.');
          }
        });
      }

    };
  });
