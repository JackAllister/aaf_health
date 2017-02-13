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
      getUserDetails() {
        $http({
          method: 'GET',
          url: apiURL + '/profile',
        }).then(function() {
          /* Success */
        }, function() {
          /* Error */

        });
      }
    }

  });
