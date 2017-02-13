'use strict';

/**
 * @ngdoc service
 * @name clientApp.authService
 * @description
 * # authService
 * Factory in the clientApp.
 */
angular.module('clientApp')
  .factory('authService', function (apiURL, $http, $cookieStore, $rootScope) {

    /* Private variables */
    var loginCallback = null;

    /* Private functions */
    var successCallback = function(response) {

      if (response.data.token) {

        /* Store the token in a cookie to preserve when page refresh */
        $cookieStore.put('token', response.data.token);

        /* Add JWT token to auth header */
        setHeaderFromCookie();

        loginCallback("Login success");
      }
    };

    /* This is called when there's incorrect credentials */
    var errorCallback = function(response) {
      if (response.data.message) {
        loginCallback(response.data.message);
      } else {
        loginCallback("Error logging in.");
      }
    };

    var setHeaderFromCookie = function() {
      $http.defaults.headers.common.Authorization =
        'Bearer ' + $cookieStore.get('token');
      $rootScope.userSignedIn = true;
    }

    /* Public API */
    return {
      /* Function for logging in */
      login: function(email, password, callback) {
        /* Make sure logged out before trying to log in */
        this.logout();

        /* Set the callback procedure for use on response */
        loginCallback = callback;

        /* Send our POST request with login info */
        $http({
          method: 'POST',
          url: apiURL + '/login',
          data: {email: email, password: password}
        }).then(successCallback, errorCallback);
      },

      /* Function for logging out */
      logout: function() {
        /* Clear authorization header & cookies */
        $cookieStore.remove('token');
        $http.defaults.headers.common.Authorization = '';
        $rootScope.userSignedIn = false;
      },

      /* Function to check user is authorised */
      isAuthed: function() {
        if ($cookieStore.get('token')) {
          $rootScope.userSignedIn = true;
          return true;
        } else {
          $rootScope.userSignedIn = false;
          return false;
        }
      },

      /* Set the user auth token and global var */
      setHeaderFromCookie
    };
  });
