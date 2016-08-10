'use strict';

angular.module('app.instagram', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/instagram', {
    templateUrl: 'instagram/instagram.html',
    controller: 'instagramCtrl'
  });
}])

.controller('instagramCtrl', ['$scope', '$http', function($scope, $http) {
  var url = 'https://aoimpact.herokuapp.com/api'
  $http.get(url).then(function (response) {
    console.log(response)
    $scope.topics = response.data
  })
}]);
