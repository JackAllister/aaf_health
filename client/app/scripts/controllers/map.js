'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MapCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    /* Called when controller created */
    this.init = function(data) {

      /* Find mid coordinates (so map is centered to that) */
      var midOfArray = data.features[0].geometry.coordinates.length;
      midOfArray = Math.floor(midOfArray / 2);

      var centerCoords = data.features[0].geometry.coordinates[midOfArray];

      /* Set our center coordinates */
      $scope.center.lat = centerCoords[1];
      $scope.center.lng = centerCoords[0];

      /* Add our geoJSON data to scope */
      angular.extend($scope, {
          geojson: {
              data: data,
              style: {
                  weight: 2,
                  opacity: 1,
                  color: 'red',
                  dashArray: '3',
              }
          }
      });
    };

    /* Initialise the map at with center coords */
    angular.extend($scope, {
        center: {
            lat: 51.505,
            lng: -0.09,
            zoom: 14
        },
        defaults: {
            scrollWheelZoom: false
        }
    });
  });
