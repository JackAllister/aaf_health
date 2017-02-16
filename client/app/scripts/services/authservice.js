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

    /* Public variables */
    return {
      /* Function for logging in */
      login: function(email, password, callback) {
        var self = this;
        /* Make sure logged out before trying to log in */
        this.logout();

        /* Send our POST request with login info */
        $http({
          method: 'POST',
          url: apiURL + '/login',
          data: {email: email, password: password}
        }).then(function(response) {
          /* Success */
          if (response.data.token) {
            /* Store the token in a cookie to preserve when page refresh */
            $cookieStore.put('token', response.data.token);

            /* Add JWT token to auth header */
            self.setHeaderFromCookie();
            callback('Login success');
          }
        }, function(response) {
          /* Error */
          if (response.data.message) {
            callback(response.data.message);
          } else {
            callback('Error logging in.');
          }
        });
      },

      /* Function for registering an account */
      register: function(name, email, password, callback) {
        var self = this;

        /* Make sure user is not already signed into an account */
        this.logout();

        /* Send our POST request with register info */
        $http({
          method: 'POST',
          url: apiURL + '/register',
          data: {'name': name, 'email': email, 'password': password}
        }).then(function(response) {
          /* Success */
          if (response.data.token) {
            /* Store the token in a cookie */
            $cookieStore.put('token', response.data.token);

            self.setHeaderFromCookie();
            callback('Registration success.');
          } else {
            /* Could be error such as email already exists */
            if (response.data.message) {
              callback(response.data.message);
            } else {
              callback('Error during registration.');
            }
          }
        }, function(response) {
          /* Error */
          if (response.data.message) {
            callback(response.data.message);
          } else {
            callback('Error during registration');
          }
        });
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
      setHeaderFromCookie: function() {
        $http.defaults.headers.common.Authorization =
          'Bearer ' + $cookieStore.get('token');
        $rootScope.userSignedIn = true;
      }
    };
  });
