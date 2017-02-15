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
      /* Returns comments linked to a specific activity */
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
      },

      /* Function for adding a new comment */
      addComment: function(actID, comment, url, callback) {
        $http({
          method: 'POST',
          url: apiURL + '/comment/add',
          data: {'actID': actID, 'comment': comment, 'url': url}
        }).then(function(response) {
          /* Success */
          if (response.data && response.data.message) {
            callback(true, response.data.message);
          } else {
            callback(false, 'Unable to add comment.');
          }
        }, function(response) {
          /* Error */
          if (response.data && response.data.message) {
            callback(false, response.data.message);
          } else {
            callback(false, 'Unable to add comment.');
          }
        });
      },

      /* Function to remove a comment */
      removeComment: function(comID, callback) {
        $http({
          method: 'POST',
          url: apiURL + '/comment/remove',
          data: {id: comID}
        }).then(function(response) {
          /* Success */
          if (response.data && response.data.message) {
            callback(true, response.data.message);
          } else {
            callback(false, 'Unable to remove comment.');
          }
        }, function(response) {
          /* Error */
          if (response.data && response.data.message) {
            callback(false, response.data.message);
          } else {
            callback(false, 'Unable to remove comment.');
          }
        });
      }

    };
  });
