(function () {
    'use strict';

    angular
        .module('AngularApp')
        .controller('userController', userController);

    userController.inject = ['$routeParams', 'usersService', 'photosService'];

    function userController($routeParams, usersService, photosService) {
        var vm = this;

        vm.photo = '';
        vm.photoPromise = photoPromise;
        vm.user = '';
        vm.userPromise = userPromise;

        activate();

        function activate() {
            vm.userPromise();
            vm.photoPromise();
        }
        function userPromise() {
            usersService.userCall($routeParams.userId)
                .then(function (data) {
                    vm.user = data;
                }, function (error) {
                    vm.user = [];
                })
        };
        function photoPromise() {
            photosService.photoCall($routeParams.userId)
                .then(function (data) {
                    vm.photo = data;
                }, function (error) {
                    vm.photo = [];
                })
        };
    }
})();