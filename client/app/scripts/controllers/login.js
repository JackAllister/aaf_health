'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('LoginCtrl', function ($location, authService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var vm = this;

    /* Login function for handling auth request to API */
    this.login = function() {
      authService.login(this.email, this.password,
        function(response) {
          vm.message = response;

          /* If authService is success redirect */
          if (authService.isAuthed()) {
            $location.path('/');
          }

        });
    };
  });
