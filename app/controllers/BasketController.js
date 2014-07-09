radianDrive.controller('BasketListController', function ($scope, $routeParams, Restangular, $timeout) {
	Restangular.all('basket/products').getList().then(function(products) {
		$scope.products = products;
	});

	$scope.update = function() {
		var basket = [];
		angular.forEach($scope.products, function(value, key) {
			for (var i = 0; i < value.quantity; i++) {
				basket.push(value.id);
			};
		});
		Restangular.one('basket', 0).customPUT(basket, null).then(function() {
			$scope.refreshBasket();
		});
	};
});
radianDrive.controller('BasketValidController', function ($scope, $rootScope, $location, AuthService, SessionService, Restangular) {
	if (! AuthService.isAuthenticated()) {
		$location.path('/auth');
	}
	Restangular.all('basket/products').getList().then(function(products) {
		$scope.products = products;
	});
});