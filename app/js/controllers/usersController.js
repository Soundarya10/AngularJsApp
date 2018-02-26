(function () {
	'use strict';

	angular
		.module('AngularApp')
		.controller('usersController', usersController);

	usersController.inject = ['usersService', 'photosService'];

	function usersController(usersService, photosService) {
		var vm = this;

		vm.photos = '';
		vm.photosPromise = photosPromise;
		vm.users = '';
		vm.usersPromise = usersPromise;

		activate();

		function activate() {
			vm.usersPromise();
			vm.photosPromise();
		}
		function usersPromise() {
			usersService.usersCall()
				.then(function (data) {
					vm.users = data;
				}, function (error) {
					vm.users = [];
				})
		};
		function photosPromise() {
			photosService.photosCall()
				.then(function (data) {
					vm.photos = data;
				}, function (error) {
					vm.photos = [];
				})
		};
	}
})();