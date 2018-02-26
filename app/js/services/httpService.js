(function () {
    'use strict';

    angular
        .module('AngularApp')
        .factory('httpService', httpService);

    httpService.$inject = ['$http', '$q'];

    function httpService($http, $q) {
        var service = {
            getCall: getCall
        }

        return service;

        function getCall(url) {
            var deferred = $q.defer();
            $http.get(url).then(function (response) {
                if (typeof response.data === 'object') {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.data);
                }
            }, function (error) {
                console.log('Error getting data from', url, error)
            });

            return deferred.promise;
        }
    }
})();