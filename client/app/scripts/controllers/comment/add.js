'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:CommentAddCtrl
 * @description
 * # CommentAddCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('CommentAddCtrl', function (commentService, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var vm = this;
    var actID = $location.search().actID;

    this.add = function() {

      /* Check to see if comment field filled in */
      if (!vm.comment) {
        vm.message = 'Cannot post empty comment.';
        return;
      }

      /* Show user comment being added */
      vm.message = 'Adding comment.';

      /* Add comment using comment service */
      commentService.addComment(actID, vm.comment, vm.url,
        function(result, data) {
          if (result) {
            vm.message = data;
            $location.path('/activities');
          } else {
            vm.message = data;
          }
        });
    }
  });
