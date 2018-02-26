 (function () {
	'use strict';
 
angular
		.module('AngularApp')
		.directive('usersDirective', usersDirective);


usersDirective.$inject = ['usersService', 'photosService'];


function usersDirective(usersService, photosService){

	var directive = {
		restrict: 'EA',
		template:'<div ng-repeat="user in users.users  | filter:usersSearch">\
						<div class="row PDB10 MGB10">\
							<a href="users/{{user.id}}" class="pull-left">\
								<img alt="image" class="img-circle icon" src="{{users.photos[user.id - 1].thumbnailUrl}}">\
							</a>\
							<div class="media-body ">\
								<strong class="name"><a href="users/{{user.id}}">{{user.name}}</a></strong><br/>\
								<small class="text-muted">{{user.email}}</small><br/>\
							</div>\
						</div>\
					</div>',
		controller: controller,
		controllerAs: 'users',
		bindToController: true,
		scope: {

		}

	};

	return directive;


	function link(scope, elem, attrs){
		var vm = scope;
	}

	function controller(){
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
}

})();