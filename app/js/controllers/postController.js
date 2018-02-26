(function () {
    'use strict';

    angular
        .module('AngularApp')
        .controller('postController', postController);

    postController.inject = ['$routeParams', 'postsService', 'usersService', 'photosService'];

    function postController($routeParams, postsService, usersService, photosService) {
        var vm = this;

        vm.postComments = '';
        vm.postCommentsPromise = postCommentsPromise;
        vm.post = '';
        vm.postPromise = postPromise;
        vm.user = '';
        vm.userPromise = userPromise;
        vm.photo = '';
        vm.photoPromise = photoPromise;

        activate();

        function activate() {
            vm.postPromise();
            vm.postCommentsPromise();
        }
        function postPromise() {
            postsService.postCall($routeParams.postId)
                .then(function (data) {
                    vm.post = data;
                    vm.userPromise();
                    vm.photoPromise();
                }, function (error) {
                    vm.post = [];
                })
        };
        function postCommentsPromise() {
            postsService.postCommentsCall($routeParams.postId)
                .then(function (data) {
                    vm.postComments = data;
                }, function (error) {
                    vm.postComments = [];
                })
        };
        function userPromise() {
            usersService.userCall(vm.post.userId)
                .then(function (data) {
                    vm.user = data;
                }, function (error) {
                    vm.user = [];
                })
        };
        function photoPromise() {
            photosService.photoCall(vm.post.userId)
                .then(function (data) {
                    vm.photo = data;
                }, function (error) {
                    vm.photo = [];
                })
        };
    }
})();