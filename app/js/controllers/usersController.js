(function () {
	'use strict';

	angular
		.module('AngularApp')
		.controller('usersController', usersController);

	usersController.inject = ['usersService', 'photosService'];

	function usersController(usersService, photosService) {
		var vm = this;
		//The functionality part here has been moved inside the users directive
	}
})();