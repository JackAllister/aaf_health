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
    'ngTouch',
    'leaflet-directive'
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
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .when('/activities', {
        templateUrl: 'views/activities.html',
        controller: 'ActivitiesCtrl',
        controllerAs: 'activities'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .when('/activities/add', {
        templateUrl: 'views/activities/add.html',
        controller: 'ActivitiesAddCtrl',
        controllerAs: 'activitiesAdd'
      })
      .when('/activities/update', {
        templateUrl: 'views/activities/update.html',
        controller: 'ActivitiesUpdateCtrl',
        controllerAs: 'activitiesUpdate'
      })
      .when('/comment/add', {
        templateUrl: 'views/comment/add.html',
        controller: 'CommentAddCtrl',
        controllerAs: 'commentAdd'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function(authService){
    /* If user already authed (via cookie) set auth header */
    if (authService.isAuthed()) {
      authService.setHeaderFromCookie();
    }
  })
  .controller('HeaderCtrl', function ($scope, $location) {
    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };
  });
