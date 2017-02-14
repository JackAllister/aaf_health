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
      /* Gets users activities using http request */
      getUserActivities: function(callback) {
        $http({
          method: 'GET',
          url: apiURL + '/activity',
          params: {'userID': 'me'}
        }).then(function(response) {
          /* Success */
          if (response.data) {
            callback(true, response.data);
          }
        }, function(response) {
          /* Error */
          callback(false, response.message);
        });
      }
    }
  });
