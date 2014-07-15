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
	if ($rootScope.firstAuth) {
		if (! AuthService.isAuthenticated()) {
			$location.path('/auth');
		}
	}
	else {
		$rootScope.$on('LOGIN_ATTEMPT', function() {
			if (! AuthService.isAuthenticated()) {
				$location.path('/auth');
			}
		});
	}

	$scope.total = 0;
	Restangular.all('basket/products').getList().then(function(products) {
		$scope.products = products;
		angular.forEach($scope.products, function(value, key) {
			$scope.total += value.price * 1 * value.quantity;
		});
	});

	$scope.i = 0;
	$scope.j = 0;
	$scope.days = [];
	$scope.disabled_days = [0];
	while ($scope.i < 6) {
		var today;
		today = moment().add('days', $scope.j);

		if ($scope.disabled_days.indexOf(today.day()) < 0)
		{
			$scope.days.push({ date : today.format('YYYY-MM-D'), label : today.format('D MMMM YYYY') });
			$scope.i++;
		}
		$scope.j++;
	}

	$scope.valid = function() {
		$scope.date = $scope.selectedDay + ' ' + $scope.selectedHour;
		Restangular.all('drive/orders').post({ date : $scope.date , shop_id : $rootScope.shop.id }).then(function(customer) {
			$location.path('/basket/finish');
		});
	}
});
radianDrive.controller('BasketFinishController', function ($scope) {
	$scope.refreshBasket();
});