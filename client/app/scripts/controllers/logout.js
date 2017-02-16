'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('LogoutCtrl', function ($rootScope, $location, authService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    /* Log out, then redirect */
    authService.logout();
    $location.path('/login');

  });
