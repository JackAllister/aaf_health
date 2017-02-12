'use strict';

/**
 * @ngdoc service
 * @name clientApp.authentication
 * @description
 * # authentication
 * Factory in the clientApp.
 */
angular.module('clientApp')
  .factory('authentication', function (apiURL, $http, $cookieStore) {
    // Service logic
    // ...
    var loginCallback = null;

    function successCallback(response) {

      if (response.data.token) {

        /* Store the token in a cookie to preserve when page refresh */
        $cookieStore.put('token', response.data.token);

        /* Add JWT token to auth header */
        $http.defaults.headers.common.Authorization =
          'Bearer ' + response.data.token;

        loginCallback(true, "Login success");
      }
    }

    /* This is called when there's incorrect credentials */
    function errorCallback(response) {
      if (response.data.message) {
        loginCallback(false, response.data.message);
      } else {
        loginCallback(false, "Error logging in.");
      }
    }

    // Public API here
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
      }
    };
  });
