radianDrive.controller('MenuController', function ($scope, Restangular) {
	Restangular.all('sections').getList({ nesting : 1}).then(function(sections) {
		$scope.sections = sections;
	});
});