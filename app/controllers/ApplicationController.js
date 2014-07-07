radianDrive.controller('ApplicationController', function ($scope, Restangular, BasketService) {
	$scope.refreshBasket = function () {
		BasketService.load();
	}
	$scope.addToBasket = function (product) {
		BasketService.add(product);
	}
	$scope.countBasket = function () {
		return BasketService.count();
	}
});