'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ActivitiesCtrl
 * @description
 * # ActivitiesCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ActivitiesCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    this.myActivities = [
      {"poster": "Jack", "time": new Date(), "title": "Test 1", "data": "testdata1"},
      {"poster": "Jack", "time": new Date(), "title": "Test 2", "data": "testdata2"},
      {"poster": "Jack", "time": new Date(), "title": "Test 3", "data": "testdata3"},
      {"poster": "Jack", "time": new Date(), "title": "Test 1", "data": "testdata1"},
      {"poster": "Jack", "time": new Date(), "title": "Test 2", "data": "testdata2"},
      {"poster": "Jack", "time": new Date(), "title": "Test 3", "data": "testdata3"},
      {"poster": "Jack", "time": new Date(), "title": "Test 1", "data": "testdata1"},
      {"poster": "Jack", "time": new Date(), "title": "Test 2", "data": "testdata2"},
      {"poster": "Jack", "time": new Date(), "title": "Test 3", "data": "testdata3"}

    ];
  });
