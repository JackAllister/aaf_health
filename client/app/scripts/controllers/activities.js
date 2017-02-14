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


    /* Call to get all activities for user */
    activitiesService.getUserActivities(function(result, data) {
      /* Callback function for filling in activities */
      if (result) {
        /* Print activity data to screen */
        vm.myActivities = data;

        /* Search through and fill in name data */
        vm.myActivities.forEach(function(activity, index, actArray) {

          /* We need to make individual requests to get names */
          profileService.getUserDetails(activity.postedBy,
            function(nameResult, response) {
              if (nameResult) {
                /* Update activity field so contains name and email */
                actArray[index].posterName = response.name;
                actArray[index].posterEmail = response.email;
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
