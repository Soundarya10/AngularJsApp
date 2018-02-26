(function () {
    'use strict';

    angular
        .module('AngularApp')
        .factory('usersService', usersService);

    usersService.$inject = ['config', 'httpService'];

    function usersService(config, httpService) {
        var service = {
            usersCall: usersCall,
            userCall: userCall
        }

        return service;

        function usersCall() {
            var usersUrl = config.root + '/users';
            return httpService.getCall(usersUrl);
        }
        function userCall(userId) {
            var usersUrl = config.root + '/users/' + userId;
            return httpService.getCall(usersUrl);
        }
    }
})();