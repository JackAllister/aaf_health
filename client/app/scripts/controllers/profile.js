'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ProfileCtrl', function (profileService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var vm = this;
    this.message = '';

    /* Function for updating user details via API */
    this.update = function() {
      //alert('updating');
    };

    profileService.getUserDetails(function(result, data) {
      /* Callback function for filling in data */
      if (result) {
        /* If response from API contains info we set view */
        vm.name = data.name;
        vm.email = data.email;
      } else {
        /* If reponse does not contain info we show error message */
        if (data) {
          vm.message = data;
        } else {
          vm.message = 'Error getting user information';
        }
      }
    });

  });
