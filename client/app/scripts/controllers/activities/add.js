'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ActivitiesAddCtrl
 * @description
 * # ActivitiesAddCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ActivitiesAddCtrl', function (activitiesService, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var vm = this;

    this.add = function() {

      /* Find number of files selected */
      var numberOfFiles = document.getElementById('tripFile').files.length;

      /* Check to see if all fields filled in */
      if (!vm.title || numberOfFiles === 0) {
        vm.message = "All data needs to be filled in.";
        return;
      }

      /* Show user activity being added */
      vm.message = 'Adding activity.';

      var fileHandle = document.getElementById('tripFile').files[0];
      var fileReader = new FileReader();

      fileReader.onloadend = function(res) {

        var fileData = res.target.result;
        console.log(fileData);
        /* Add activity using the activities service */
        activitiesService.addActivity(vm.title, fileData,
        function(result, data) {

          if (result) {
            vm.message = data;
            $location.path('/activities');
          } else {
            vm.message = data;
          }
        });
      };

      /* Read the file using the handle provided */
      fileReader.readAsBinaryString(fileHandle);

    };

  });
