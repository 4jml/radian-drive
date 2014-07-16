radianDrive.factory('AuthService', function ($rootScope, Restangular, SessionService) {
	return {
		login: function (credentials) {
			return Restangular
			.all('customers/auth')
			.post(credentials)
			.then(
				function (customer) {
					SessionService.create(customer);
					$rootScope.firstAuth = true;
					$rootScope.$broadcast("LOGIN_ATTEMPT");
				},
				function (customer) {
					$rootScope.firstAuth = true;
					SessionService.create({ id : null, lastname: null, firstname: null });
					$rootScope.$broadcast("LOGIN_ATTEMPT");
				}
			);
		},
		isAuthenticated: function () {
			return (SessionService.id > 0);
		},
		isAuthorized: function (authorizedRoles) {
			if (!angular.isArray(authorizedRoles)) {
				authorizedRoles = [authorizedRoles];
			}
			return (this.isAuthenticated() &&
				authorizedRoles.indexOf(SessionService.role) !== -1);
		}
	};
});