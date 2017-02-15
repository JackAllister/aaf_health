'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ActivitiesCtrl
 * @description
 * # ActivitiesCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ActivitiesCtrl', function (activitiesService,
  commentService, profileService, $location, $route) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var vm = this;
    this.message = '';
    this.myActivities = [];

    /* Returns the name of the poster from the activity */
    function getNameFromPostedBy(item) {

      /* We need to make individual request to get name */
      profileService.getUserDetails(item.postedBy,
        function(nameResult, response) {
          if (nameResult) {
            /* Update activity field so contains name and email */
            item.posterName = response.name;
            item.posterEmail = response.email;
          } else {
            /* Set name to unknown and display message */
            item.posterName = 'unknown';
            item.posterEmail = 'unknown';
            if (response) {
              vm.message = response;
            } else {
              vm.message = 'Error getting user information.';
            }
          }
      });
    };

    /* Redirects user to add activity page */
    this.addActivity = function() {
      $location.path('/activities/add');
    };

    /* Redirects user to update activity page */
    this.updateActivity = function(actID) {
      $location.path('/activities/update').search({'actID': actID});
    };

    /* Deletes activity and reloads current view */
    this.deleteActivity = function(actID) {
      activitiesService.removeActivity(actID, function(result, data) {
        if (result) {
          $route.reload();
        } else {
          vm.message = data;
        }
      });
    };

    /* Redirects user to add comment page */
    this.addComment = function(actID) {
      $location.path('/comment/add').search({'actID': actID});
    }


    /* Call to get all activities for user */
    activitiesService.getActivities({'userID': 'me'}, function(result, data) {
      /* Callback function for filling in activities */
      if (result) {
        /* Print activity data to screen */
        vm.myActivities = data;

        /* Iterate through each activity in array */
        vm.myActivities.forEach(function(activity) {

            /* Fill in names of posters for activities */
            getNameFromPostedBy(activity);

            /* Get comments for activity */
            commentService.getActComments(activity.actID, function(result, data) {

              /* Check result to see if successful */
              if (result) {
                activity.comments = data;

                /* Get poster info for each comment */
                activity.comments.forEach(function(comment) {
                  getNameFromPostedBy(comment);
                });
              } else {
                activity.comments = [];

                /* Alert user there was failure to get comments */
                if (data) {
                  vm.message = data;
                } else {
                  vm.message = 'Error getting activity comments';
                }
              }

            });

        });

        //TODO: Remove as is just for debug
        //console.log(vm.myActivities);

      } else {
        /* If response failed to get activities */
        if (data) {
          vm.message = data;
        } else {
          vm.message = 'Error getting user activities.';
        }
      }
    });


  });
