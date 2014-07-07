radianDrive.controller('ShopController', function ($rootScope, $scope, Restangular) {
	Restangular.all('shops').getList().then(function(shops) {
		$scope.shops = shops;
	});

	$scope.submit = function() {
		$rootScope.shop = $scope.selectedShop;
		$.cookie('shop_id', $scope.shop.id);
		window.location.reload();
	}
});