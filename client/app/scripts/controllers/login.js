'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('LoginCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    function handleRequest(res) {
      var token = res.data ? res.data.token: null;
      if (token) {
        console.log('JWT: ', token);
      }
      self.message = res.data.message;
    }

    this.login = function() {
        this.message = "Login attempt";
    }

    self.isAuthed = function() {
      return auth.isAuthed ? auth.isAuthed(): false
    }
  });
