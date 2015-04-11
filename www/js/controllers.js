angular.module('starter.controllers', [])
.controller('LoginCtrl', function($scope, auth, $location, store) {
  function doAuth() {
    auth.signin({
      closable: false,
      // This asks for the refresh token
      // So that the user never has to log in again
      authParams: {
        scope: 'openid offline_access'
      }
    }, function(profile, idToken, accessToken, state, refreshToken) {
      store.set('profile', profile);
      store.set('token', idToken);
      store.set('refreshToken', refreshToken);
      console.log("success!");
    }, function(error) {
      console.log("There was an error logging in", error);
    });
  }

  doAuth();

  $scope.isAuthenticated = function()
  {
    return auth.isAuthenticated;
  }
});
