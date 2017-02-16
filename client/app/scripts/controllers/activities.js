'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ActivitiesCtrl
 * @description
 * # ActivitiesCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ActivitiesCtrl', function (activitiesService,
  commentService, profileService, leafletData, $location, $route, $scope) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var vm = this;
    this.message = '';
    vm.myActivities = [];

    /* Function for making sure only unique ID's are kept in array */
    Array.prototype.removeDuplicates = function () {
      var newActivities = [];

      /* Iterate through existing array */
      for (var i = 0 ; i < this.length ; i++) {
          var found = false;

          /* Iterate through new array */
          for (var j = 0; j < newActivities.length; j++) {
            if (newActivities[j].actID === this[i].actID) {
              found = true;
            }
          }

          if (!found) {
            newActivities.push(this[i]);
          }
      }
      return newActivities;
     };

    function loadActivities(searchTerm, appendExisting) {
      /* Call to get all activities for user */
      activitiesService.getActivities(searchTerm, function(result, data) {
        /* Callback function for filling in activities */
        if (result) {
          /* Iterate through each activity in array */
          data.forEach(function(activity) {

              /* Set up leaflet map */
              angular.extend($scope, {
                center: {
                    lat: 51.505,
                    lng: -0.09,
                    zoom: 8
                },
                defaults: {
                    tileLayer: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
                    maxZoom: 14,
                    path: {
                        weight: 10,
                        color: '#800000',
                        opacity: 1
                    }
                }
              });

              leafletData.getMap('map-' + activity.actID)
              .then(function(map) {
                /* WHAT THE FUCK DO I DO HERE */
                console.log(map);
                console.log(L);
                L.GeoJSON(activity.tripData).add(map);
              });

              // var valName = activity.actID;
              // console.log(valName);
              // angular.extend($scope, {
              //     valName: {
              //         data: activity.tripData,
              //         style: {
              //             fillColor: "green",
              //             weight: 2,
              //             opacity: 1,
              //             color: 'white',
              //             dashArray: '3',
              //             fillOpacity: 0.7
              //         }
              //     }
              // });

              /* Fill in names of posters for activities */
              getNameFromPostedBy(activity);

              /* Get comments for activity */
              commentService.getActComments(activity.actID, function(result, data) {

                /* Check result to see if successful */
                if (result) {
                  activity.comments = data;

                  /* Get poster info for each comment */
                  activity.comments.forEach(function(comment) {
                    getNameFromPostedBy(comment);
                  });
                } else {
                  activity.comments = [];

                  /* Alert user there was failure to get comments */
                  if (data) {
                    vm.message = data;
                  } else {
                    vm.message = 'Error getting activity comments';
                  }
                }

              });

          });

          /* Print activity data to screen */
          if (appendExisting) {
            if (vm.myActivities.length !== 0) {
              /* Concat previous activities */
              vm.myActivities = vm.myActivities.concat(data);

              /* Remove duplicates */
              vm.myActivities = vm.myActivities.removeDuplicates();

            } else {
              vm.myActivities = data;
            }
          } else {
            vm.myActivities = data;
          }

        } else {
          /* If response failed to get activities */
          if (data) {
            vm.message = data;
          } else {
            vm.message = 'Error getting user activities.';
          }
        }
      });
    }

    /* Returns the name of the poster from the activity */
    function getNameFromPostedBy(item) {

      /* We need to make individual request to get name */
      profileService.getUserDetails(item.postedBy,
        function(nameResult, response) {
          if (nameResult) {
            /* Update activity field so contains name and email */
            item.posterName = response.name;
            item.posterEmail = response.email;
          } else {
            /* Set name to unknown and display message */
            item.posterName = 'unknown';
            item.posterEmail = 'unknown';
            if (response) {
              vm.message = response;
            } else {
              vm.message = 'Error getting user information.';
            }
          }
      });
    }

    /* Redirects user to add activity page */
    this.addActivity = function() {
      $location.path('/activities/add');
    };

    /* Redirects user to update activity page */
    this.updateActivity = function(actID) {
      $location.path('/activities/update').search({'actID': actID});
    };

    this.shareActivity = function(actID) {
      activitiesService.toggleShareActivity(actID, function(result, data) {
        if (result) {
          $route.reload();
        } else {
          vm.message = data;
        }
      });
    };

    /* Deletes activity and reloads current view */
    this.deleteActivity = function(actID) {
      activitiesService.removeActivity(actID, function(result, data) {
        if (result) {
          $route.reload();
        } else {
          vm.message = data;
        }
      });
    };

    /* Redirects user to add comment page */
    this.addComment = function(actID) {
      $location.path('/comment/add').search({'actID': actID});
    };

    /* Removes a specified comment */
    this.deleteComment = function(commentID) {
      commentService.removeComment(commentID, function(result, data) {
        if (result) {
          $route.reload();
        } else {
          vm.message = data;
        }
      });
    };

    /*
     * Need to load all activities that the user can currently
     * view. It will not show unshared activities of other users.
     *
     * Search terms can be implemented via something like below:
     * loadActivities({userID: 'me'}, false);
     */

    /* Load users own activities */
    loadActivities({userID: 'me'}, false);

    /* Load all shared and append */
    loadActivities({shared: true}, true);
  });
