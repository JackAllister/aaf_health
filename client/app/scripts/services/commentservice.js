'use strict';

/**
 * @ngdoc service
 * @name clientApp.commentService
 * @description
 * # commentService
 * Service in the clientApp.
 */
angular.module('clientApp')
  .service('commentService', function (apiURL, $http) {

    /* Private variables */

    /* Public variables */
    return {
      getActComments: function(actID, callback) {
        $http({
          method: 'GET',
          url: apiURL + '/comment',
          params: {'actID': actID}
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
            callback(false, 'Error getting user comments');
          }
        });
      }
    };
  });
