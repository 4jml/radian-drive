radianDrive.service('BasketService', function (Restangular) {
	this.basket = [];

	this.load = function () {
		this.basket = Restangular.all('basket').getList().$object;
	};
	this.count = function() {
		if (typeof this.basket != "undefined")
			return this.basket.length;
		else
			return 0;
	}
	this.add = function (product) {
		Restangular.all('basket').post(product.id);
		this.basket.push(product.id);
	};
	return this;
});