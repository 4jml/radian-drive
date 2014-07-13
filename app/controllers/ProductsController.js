radianDrive.controller('ProductsCategoryController', function ($scope, $routeParams, Restangular) {
	Restangular.one('categories', $routeParams.id).get().then(function(category) {
		$scope.category = category;
	});
	Restangular.one('categories', $routeParams.id).all('products').getList().then(function(products) {
		$scope.products = products;
	});
});