var radianDrive = angular.module('radianDrive' , [ 'ngRoute' , 'restangular' ]);

radianDrive.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'app/views/index.html',
			}).
			otherwise({
				redirectTo: '/'
			});
	}
]);