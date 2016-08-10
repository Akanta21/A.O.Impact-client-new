'use strict'

angular.module('angelApp')
.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!')

  $routeProvider.otherwise('/')
}])
.config(function ($mdThemingProvider) {
  $mdThemingProvider.theme('default')
  .primaryPalette('grey', {
    'default': '400', // by default use shade 400 from the pink palette for primary intentions
    'hue-1': '200', // use shade 100 for the <code>md-hue-1</code> class
    'hue-2': '500', // use shade 600 for the <code>md-hue-2</code> class
    'hue-3': '800' // use shade A100 for the <code>md-hue-3</code> class
  })
  // If you specify less than all of the keys, it will inherit from the
  // default shades
  .accentPalette('blue', {
    'default': '300' // use shade 300 for default, and keep all other shades the same
  })
  .warnPalette('red')
})
.controller('mainController', function ($scope, $http) {
  $scope.currentUserSignedIn = false
  if (window.localStorage.auth_token && window.localStorage.user_email) {
    $scope.currentUserSignedIn = true
    $http({
      method: 'GET',
      url: 'https://aoimpact.herokuapp.com/user',
      headers: {
        'User-Email': window.localStorage.user_email,
        'Auth-Token': window.localStorage.auth_token
      }
    })
    .success(function (response) {
      console.log(response)
      $scope.res = response
    })
  }
})
