(function () {
    'use strict';

    angular
        .module('AngularApp')
        .factory('photosService', photosService);

    photosService.$inject = ['config', 'httpService'];

    function photosService(config, httpService) {
        var service = {
            photosCall: photosCall,
            photoCall: photoCall
        }

        return service;

        function photosCall() {
            var photosUrl = config.root + '/photos';
            return httpService.getCall(photosUrl);
        }
        function photoCall(photoId) {
            var photosUrl = config.root + '/photos/' + photoId;
            return httpService.getCall(photosUrl);
        }
    }
})();