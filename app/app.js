var radianDrive = angular.module('radianDrive' , [ 'ngRoute' , 'restangular' ]);

radianDrive.run(function($rootScope, Restangular, BasketService, AuthService, $location) {
	// Hydrate basket from session
	BasketService.load();

	// Login customer
	AuthService.login(null);

	moment.lang('fr');
	$rootScope.shop = null;

	// Loading selected shop if there is one
	if (typeof $.cookie('shop_id') != "undefined") {
		Restangular.one('shops').get().then(function(shop) {
			$rootScope.shop = shop[0];
		});
	}
	else {
		$rootScope.shop = { id : 0 };
	}

	var history = [];

	$rootScope.$on('$routeChangeSuccess', function() {
		history.push($location.$$path);
	});

	$rootScope.back = function () {
		var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
		$location.path(prevUrl);
	};
});

radianDrive.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'app/views/index.html',
		}).
		when('/auth', {
			templateUrl: 'app/views/auth.html',
			controller: 'AuthController',
			routeTitle: 'Authentification',
			routeName: 'auth'
		}).
		when('/disconnect', {
			templateUrl: 'app/views/auth.html',
			controller: 'DisconnectController',
			routeTitle: 'Déconnexion',
			routeName: 'disconnect'
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
		when('/basket/valid', {
			templateUrl: 'app/views/basket/valid.html',
			controller: 'BasketValidController',
			routeTitle: 'Valider votre commande',
			routeName: 'basket_valid'
		}).
		when('/basket/finish', {
			templateUrl: 'app/views/basket/finish.html',
			controller: 'BasketFinishController',
			routeTitle: 'Commande terminée',
			routeName: 'basket_finish'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
	]);

radianDrive.config(function(RestangularProvider) {
	RestangularProvider.setBaseUrl(API_URL);
	RestangularProvider.setDefaultHeaders({
		'radian_app': 'radian_drive',
	});
	// RestangularProvider.setDefaultHttpFields({
	// 	headers: {
	// 		test: 'test'
	// 	}
	// });
RestangularProvider.setDefaultHttpFields({
	'withCredentials': true
});
});