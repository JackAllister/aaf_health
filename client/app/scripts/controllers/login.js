'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('LoginCtrl', function ($rootScope, $location, authentication) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var vm = this;

    /* Make sure logged out before trying to access this page */
    authentication.logout();

    this.login = function() {
      authentication.login(this.email, this.password,
        function(isAuthed, response) {

          vm.message = response;

          /* If authentication is success redirect */
          if (isAuthed) {
            $location.path('/');
            $rootScope.userSignedIn = true;
          }

        });
    };
  });
