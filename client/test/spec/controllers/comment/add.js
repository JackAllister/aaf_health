'use strict';

describe('Controller: CommentAddCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var CommentAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CommentAddCtrl = $controller('CommentAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CommentAddCtrl.awesomeThings.length).toBe(3);
  });
});
