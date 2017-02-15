'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AddActivityCtrl
 * @description
 * # AddActivityCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('AddActivityCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var vm = this;

    this.add = function() {
      if (!vm.title || !vm.tripData) {
        vm.message = "All data needs to be filled in.";
        return;
      }
    };
  });
