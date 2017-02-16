'use strict';

describe('Controller: ActivitiesAddCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var ActivitiesAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActivitiesAddCtrl = $controller('ActivitiesAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ActivitiesAddCtrl.awesomeThings.length).toBe(3);
  });
});
