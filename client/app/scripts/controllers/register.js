'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('RegisterCtrl', function ($location, authService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var vm = this;

    this.register = function() {
      authService.register(this.name, this.email, this.password,
        function(response) {
          /* Callback function for auth service */
          vm.message = response;

          if (authService.isAuthed()) {
            $location.path('/');
          }
        });
    };

  });
