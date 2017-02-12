'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .constant('apiURL', 'http://localhost:3000/api')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl',
        controllerAs: 'logout'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($http, $cookieStore){
    if ($cookieStore.get('token')) {
      /* If a token is stored as a token we can use this */
      $http.defaults.headers.common.Authorization =
        'Bearer ' + $cookieStore.get('token');
    }
  })
  .controller('HeaderCtrl', function ($scope, $location) {
    $scope.isActive = function(viewLocation) {
      console.log(viewLocation);
      console.log($location.path());
      return viewLocation === $location.path();
    };
  });
