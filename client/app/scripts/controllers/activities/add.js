'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ActivitiesAddCtrl
 * @description
 * # ActivitiesAddCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ActivitiesAddCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var vm = this;

    this.addActivity = function() {
      if (!vm.title || !vm.tripData) {
        vm.message = "All data needs to be filled in.";
        return;
      }
    };

  });
