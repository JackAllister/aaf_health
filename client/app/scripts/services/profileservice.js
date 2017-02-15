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
      getUserDetails: function(id, callback) {
        $http({
          method: 'GET',
          url: apiURL + '/profile',
          params: {'userID': id}
        }).then(function(response) {
          /* Success */
          if (response.data.name && response.data.email)
          {
            callback(true, response.data);
          }
        }, function(response) {
          /* Error */
          if (response.data && response.data.message) {
            callback(false, response.data.message);
          } else {
            callback(false, 'Error getting user information.');
          }
        });
      },

      /* Updates user database via API */
      updateUserDetails: function(name, email, password, callback) {
        $http({
          method: 'POST',
          url: apiURL + '/profile/update',
          data: {name: name, email : email, password: password}
        }).then(function(response) {
          /* Success */
          if (response.data.message) {
            callback(response.data.message);
          } else {
            callback('Something went wrong.');
          }
        }, function(response) {
          /* Error */
          if (response.data && response.data.message) {
            callback(response.data.message);
          } else {
            callback('Error updating user information.');
          }
        });
      }
    };

  });
