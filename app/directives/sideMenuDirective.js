radianDrive.directive('sidemenu', function() {
	return {
		link: function($scope, element, attrs) {
			$(element).on('click', 'li.dropdown > a', function() {
				var submenu = $(this).next();

				if (submenu.is(':visible'))
					submenu.hide(250);
				else
					submenu.show(250);
			})
		}
	};
});