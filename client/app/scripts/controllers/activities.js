'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ActivitiesCtrl
 * @description
 * # ActivitiesCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ActivitiesCtrl', function (activitiesService, profileService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var vm = this;
    this.message = '';
    this.myActivities = [];

    function getNameFromPostedBy(activity, index) {

      /* We need to make individual request to get name */
      profileService.getUserDetails(activity.postedBy,
        function(nameResult, response) {
          if (nameResult) {
            /* Update activity field so contains name and email */
            vm.myActivities[index].posterName = response.name;
            vm.myActivities[index].posterEmail = response.email;
          } else {
            /* Set name to unknown and display message */
            activity.poster = 'unknown';
            if (response) {
              vm.message = response;
            } else {
              vm.message = 'Error getting user information.';
            }
          }
      });
    }


    /* Call to get all activities for user */
    activitiesService.getUserActivities(function(result, data) {
      /* Callback function for filling in activities */
      if (result) {
        /* Print activity data to screen */
        vm.myActivities = data;

        /* Iterate through each activity in array */
        vm.myActivities.forEach(function(activity, index, actArray) {

            /* Fill in names of posters for activities */
            getNameFromPostedBy(activity, index);
        });

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
