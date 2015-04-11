// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['starter.controllers',
  'auth0',
  'angular-storage',
  'angular-jwt'])

.config(function(authProvider, jwtInterceptorProvider, $httpProvider) {

  // Configure Auth0
  authProvider.init({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    loginState: 'login'
  });

  jwtInterceptorProvider.tokenGetter = function(store, jwtHelper, auth) {
    var idToken = store.get('token');
    var refreshToken = store.get('refreshToken');
    if (!idToken || !refreshToken) {
      return null;
    }
    if (jwtHelper.isTokenExpired(idToken)) {
      return auth.refreshIdToken(refreshToken).then(function(idToken) {
        store.set('token', idToken);
        return idToken;
      });
    } else {
      return idToken;
    }
  }

  $httpProvider.interceptors.push('jwtInterceptor');

}).run(function($rootScope, auth, store) {
  $rootScope.$on('$locationChangeStart', function() {
    if (!auth.isAuthenticated) {
      var token = store.get('token');
      if (token) {
        auth.authenticate(store.get('profile'), token);
      }
    }
  });
});
