'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('LogoutCtrl', function ($rootScope, $location, authentication) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    /* Log out, set our signed in variable to false then redirect */
    authentication.logout();
    $rootScope.userSignedIn = false;
    $location.path('/login');

  });
