'use strict';

describe('Service: activitiesService', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var activitiesService;
  beforeEach(inject(function (_activitiesService_) {
    activitiesService = _activitiesService_;
  }));

  it('should do something', function () {
    expect(!!activitiesService).toBe(true);
  });

});
