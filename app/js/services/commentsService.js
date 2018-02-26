(function () {
    'use strict';

    angular
        .module('AngularApp')
        .factory('commentsService', commentsService);

    commentsService.$inject = ['config', 'httpService'];

    function commentsService(config, httpService) {
        var service = {
            commentsCall: commentsCall,
            commentCall: commentCall
        }

        return service;

        function commentsCall() {
            var commentsUrl = config.root + '/comments';
            return httpService.getCall(commentsUrl);
        }
        function commentCall(commentId) {
            var commentsUrl = config.root + '/comments/' + commentId;
            return httpService.getCall(commentsUrl);
        }
    }
})();