'use strict';

angular.module('app.product', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/product', {
    templateUrl: 'product/product.html',
    controller: 'productCtrl'
  });
}])

.controller('productCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
  var url = 'https://aoimpact.herokuapp.com/products'
  var itemsArray = []
  var priceArray = []
  var totalPrice = 0

  $http.get(url).then(function(response) {
    console.log(response)
    $scope.topics = response.data
    $scope.id = response.data._id
  })
  $scope.delete = function (id) {
    console.log(id)
    $http({
      method: 'DELETE',
      url: 'https://aoimpact.herokuapp.com/product/' + id,
      headers: {
        'User-Email': window.localStorage.user_email
      }
    })
    .success(function () {
      console.log('deleted')
      location.reload()
    })
  }
  $scope.addToHistory = function (item) {
    console.log(item)
    $http({
      method: 'PATCH',
      url: 'https://aoimpact.herokuapp.com/addpurchase',
      headers: {
        'Auth-Token': window.localStorage.auth_token
      },
      data: {
        purchase_history: item
      }
    })
    .success(function () {
      console.log('added to purchase history')
      $location.path('/product')
      location.reload()
    })
  }
  $scope.addToCart = function (item, price) {
    itemsArray.push(item)
    priceArray.push(price)
    totalPrice += price
    console.log(itemsArray)
    console.log(priceArray)
    console.log(totalPrice)
  }
  // $scope.removeCart = function (item, price) {
  //   totalPrice -= price
  //   console.log(totalPrice)
  //   for (var i = itemsArray.length - 1; i >= 0; i--) {
  //     if (itemsArray[i] === item) {
  //       console.log(itemsArray)
  //       return itemsArray.splice(i, 1)
  //     }
  //   }
  //   for (var j = priceArray.length - 1; j >= 0; i--) {
  //     if (priceArray[j].toString() === price.toString()) {
  //       console.log(priceArray)
  //       return priceArray.splice(j, 1)
  //     }
  //   }
  // }
}])
