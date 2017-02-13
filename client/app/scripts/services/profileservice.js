'use strict';

/**
 * @ngdoc service
 * @name clientApp.profileService
 * @description
 * # profileService
 * Service in the clientApp.
 */
angular.module('clientApp')
  .service('profileService', function (apiURL, $http) {

    /* Private variables */

    /* Public variables */
    return {
      /* Gets users info using http request */
      getUserDetails(callback) {
        $http({
          method: 'GET',
          url: apiURL + '/profile',
        }).then(function(response) {
          /* Success */
          if (response.data.name && response.data.email)
          {
            callback(true, response.data);
          }
        }, function(response) {
          /* Error */
          callback(false, response.message);
        });
      }
    }

  });
