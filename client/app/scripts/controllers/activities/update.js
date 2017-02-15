'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ActivitiesUpdateCtrl
 * @description
 * # ActivitiesUpdateCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ActivitiesUpdateCtrl', function (activitiesService, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var vm = this;
    var actID = $location.search().actID;

    this.update = function() {
      if (!vm.title || !vm.tripData) {
        vm.message = "All data needs to be filled in.";
        return;
      }

      /* Show user activity being updated */
      vm.message = 'Updating activity';

      /* Update current activity */
      activitiesService.updateActivity(actID, vm.title, vm.tripData,
        function(result, data) {
          vm.message = data;
        });
    }

    /* Fill the view with current activity information */
    activitiesService.getActivities({'actID': actID}, function(result, data) {
      if (result) {

        if (data.length == 1) {
          vm.title = data[0].title;
          vm.tripData = data[0].tripData;
        } else if (data.length == 0 ) {
          vm.message = 'Invalid activity ID.';
        } else {
          vm.message = 'Server returned more than one activity';
        }
        
      } else {
        if (data) {
          vm.message = data;
        } else {
          vm.message = 'Error gathering activity';
        }
      }
    });

  });
