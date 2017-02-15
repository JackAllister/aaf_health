'use strict';

describe('Controller: ActivitiesRemoveCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var ActivitiesRemoveCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActivitiesRemoveCtrl = $controller('ActivitiesRemoveCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ActivitiesRemoveCtrl.awesomeThings.length).toBe(3);
  });
});
