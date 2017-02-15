'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ActivitiesCtrl
 * @description
 * # ActivitiesCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ActivitiesCtrl', function (activitiesService, profileService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var vm = this;
    this.message = '';
    this.myActivities = [];

    /* Returns the name of the poster from the activity */
    function getNameFromPostedBy(item, index) {

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


    /* Call to get all activities for user */
    activitiesService.getUserActivities(function(result, data) {
      /* Callback function for filling in activities */
      if (result) {
        /* Print activity data to screen */
        vm.myActivities = data;

        /* Iterate through each activity in array */
        vm.myActivities.forEach(function(activity, index, actArray) {

            /* Fill in names of posters for activities */
            getNameFromPostedBy(activity, index);

            /* Get comments for activity */
            var fakeComments = [
              {
                "_id": "58a46f98b4f76965cc3b7964",
                "postedBy": "58a3383f0fe15428095cbfb9",
                "time": "2017-02-15T15:11:20.287Z",
                "comment": "test comment 1",
                "url": "http://google.com"
              },
              {
                "_id": "58a46f98b4f76965cc3b7964",
                "postedBy": "58a3383f0fe15428095cbfb9",
                "time": "2017-02-15T15:11:20.287Z",
                "comment": "test comment 2",
              },
              {
                "_id": "58a46f98b4f76965cc3b7964",
                "postedBy": "58a3383f0fe15428095cbfb9",
                "time": "2017-02-15T15:11:20.287Z",
                "comment": "test comment 3",
                "url": "http://google.com"
              }
            ];

            activity.comments = fakeComments;

            /* Get poster info for each comment */
            activity.comments.forEach(function(comment, index, actArray) {
              getNameFromPostedBy(comment, index);
            });
        });
        console.log(vm.myActivities);

      } else {
        /* If response failed to get activities */
        if (data) {
          vm.message = data;
        } else {
          vm.message = 'Error getting user activities.';
        }
      }
    });


  });
