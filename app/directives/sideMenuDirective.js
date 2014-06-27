radianDrive.directive('sidemenu', function() {
	return {
		link: function($scope, element, attrs) {
			$(element).on('click', 'li.dropdown', function() {
				var submenu = $(this).find('ul:first');

				if (submenu.is(':visible'))
					submenu.hide(250);
				else
					submenu.show(250);
			})
		}
	};
});