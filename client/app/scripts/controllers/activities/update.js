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

    activitiesService.getActivities({'actID': actID}, function(result, data) {
      if (result) {
        console.log(data);
        if (data.length == 1) {
          vm.title = data[0].title;
          vm.tripData = data[0].tripData;
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
