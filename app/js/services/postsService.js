(function () {
    'use strict';

    angular
        .module('AngularApp')
        .factory('postsService', postsService);

    postsService.$inject = ['config', 'httpService'];

    function postsService(config, httpService) {
        var service = {
            postsCall: postsCall,
            postCall: postCall,
            postCommentsCall: postCommentsCall
        }

        return service;

        function postsCall() {
            var postsUrl = config.root + '/posts';
            return httpService.getCall(postsUrl);
        }
        function postCall(postId) {
            var postsUrl = config.root + '/posts/' + postId;
            return httpService.getCall(postsUrl);
        }
        function postCommentsCall(postId) {
            var postsUrl = config.root + '/posts/' + postId + '/comments';
            return httpService.getCall(postsUrl);
        }
    }
})();