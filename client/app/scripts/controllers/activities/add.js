'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ActivitiesAddCtrl
 * @description
 * # ActivitiesAddCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ActivitiesAddCtrl', function (activitiesService, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var vm = this;

    this.addActivity = function() {

      /* Check to see if all fields filled in */
      if (!vm.title || !vm.tripData) {
        vm.message = "All data needs to be filled in.";
        return;
      }

      /* Show user activity being added */
      vm.message = 'Adding activity';

      /* Add activity using the activities service */
      activitiesService.addActivity(vm.title, vm.tripData,
        function(result, data) {

          if (result) {
            vm.message = data;
            $location.path('/activities');
          } else {
            vm.message = data;
          }
        });
    };

  });
