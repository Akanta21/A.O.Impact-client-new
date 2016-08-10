'use strict'

angular.module('app.login', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'loginCtrl'
  })
}])

.controller('loginCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  $scope.login = function () {
    var data = {
      email: $scope.formData.email,
      password: $scope.formData.password
    }
    console.log(data)
    $http({
      method: 'POST',
      // url: 'https://localhost:3000/signin',
      url: 'https://aoimpact.herokuapp.com/signin',
      data: data
    })
    .success(function (data) {
      console.log(data)
      window.localStorage.user_email = data.email
      window.localStorage.auth_token = data.auth_token
      $location.path('/')
    })
  }
}])
