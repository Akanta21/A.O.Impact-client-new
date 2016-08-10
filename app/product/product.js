'use strict';

angular.module('app.product', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/product', {
    templateUrl: 'product/product.html',
    controller: 'productCtrl'
  });
}])

.controller('productCtrl', ['$scope', '$http', function($scope, $http) {
  var url = 'https://aoimpact.herokuapp.com/products'

  $http.get(url).then(function(response) {
    console.log(response)
    $scope.topics = response.data
  })
}]);
