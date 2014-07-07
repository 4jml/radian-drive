var radianDrive = angular.module('radianDrive' , [ 'ngRoute' , 'restangular' ]);

radianDrive.run(function($rootScope, BasketService) {
	BasketService.load();
});

radianDrive.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'app/views/index.html',
		}).
		when('/category/:id', {
			templateUrl: 'app/views/products/category.html',
			controller: 'ProductsCategoryController',
			routeTitle: 'Liste des produits',
			routeName: 'products_category'
		}).
		when('/basket', {
			templateUrl: 'app/views/basket/list.html',
			controller: 'BasketListController',
			routeTitle: 'Votre panier',
			routeName: 'basket_list'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]);

radianDrive.config(function(RestangularProvider) {
	RestangularProvider.setBaseUrl(API_URL);
	// RestangularProvider.setDefaultHeaders({
	// 	'x-application': 'radian_drive',
	// });
	// RestangularProvider.setDefaultHttpFields({
	// 	headers: {
	// 		test: 'test'
	// 	}
	// });
	RestangularProvider.setDefaultHttpFields({
		'withCredentials': true
	});
});