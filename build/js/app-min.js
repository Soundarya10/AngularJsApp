(function () {
  'use strict';

  angular
    .module('AngularApp', ['ngRoute']);

})();
(function () {
    'use strict';

    angular
        .module('AngularApp')
        .constant('config', {
            'root': 'http://jsonplaceholder.typicode.com',
        })
        .config(config);

    config.$inject = ['$routeProvider', '$locationProvider'];

    function config($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'posts.html',
                controller: 'postsController',
                controllerAs: 'vm'
            }).
            when('/posts/:postId', {
                templateUrl: 'post.html',
                controller: 'postController',
                controllerAs: 'vm'
            }).
            when('/users', {
                templateUrl: 'users.html',
                controller: 'usersController',
                controllerAs: 'vm'
            }).
            when('/users/:userId', {
                templateUrl: 'user.html',
                controller: 'userController',
                controllerAs: 'vm'
            }).
            otherwise({
                redirectTo: '/'
            });

        if (window.history && window.history.pushState) {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }
    }
})();
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
(function () {
	'use strict';

	angular
		.module('AngularApp')
		.controller('postsController', postsController);

	postsController.inject = ['postsService', 'usersService', 'photosService','$scope'];

	function postsController(postsService, usersService, photosService, $scope) {
		
		var vm = this;
		  // $scope.user = {
    //   name: 'Mehmet Canker',
    //   address: 'Middle Earth'
    // };
		vm.photos = '';
		vm.photosPromise = photosPromise;
		vm.posts = '';
		vm.postsPromise = postsPromise;
		vm.users = '';
		vm.usersPromise = usersPromise;

		activate();

		function activate() {
			vm.postsPromise();
			vm.usersPromise();
			vm.photosPromise();
		}
		function postsPromise() {
			postsService.postsCall()
				.then(function (data) {
					vm.posts = data;
				}, function (error) {
					vm.posts = [];
				})
		};
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
 (function () {
	'use strict';

 angular
		.module('AngularApp')
		.directive('pageHeading', function() {
    return {
      template: '<h1>Angular Sample Application </h1>'
    };
  });

  })();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbmZpZy5qcyIsImNvbnRyb2xsZXJzL3Bvc3RDb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvcG9zdHNDb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvdXNlckNvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy91c2Vyc0NvbnRyb2xsZXIuanMiLCJzZXJ2aWNlcy9jb21tZW50c1NlcnZpY2UuanMiLCJzZXJ2aWNlcy9odHRwU2VydmljZS5qcyIsInNlcnZpY2VzL3Bob3Rvc1NlcnZpY2UuanMiLCJzZXJ2aWNlcy9wb3N0c1NlcnZpY2UuanMiLCJzZXJ2aWNlcy91c2Vyc1NlcnZpY2UuanMiLCJkaXJlY3RpdmVzL2hlYWRpbmdEaXJlY3RpdmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAtbWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ0FuZ3VsYXJBcHAnLCBbJ25nUm91dGUnXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ0FuZ3VsYXJBcHAnKVxyXG4gICAgICAgIC5jb25zdGFudCgnY29uZmlnJywge1xyXG4gICAgICAgICAgICAncm9vdCc6ICdodHRwOi8vanNvbnBsYWNlaG9sZGVyLnR5cGljb2RlLmNvbScsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY29uZmlnKGNvbmZpZyk7XHJcblxyXG4gICAgY29uZmlnLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJywgJyRsb2NhdGlvblByb3ZpZGVyJ107XHJcblxyXG4gICAgZnVuY3Rpb24gY29uZmlnKCRyb3V0ZVByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyLlxyXG4gICAgICAgICAgICB3aGVuKCcvJywge1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdwb3N0cy5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdwb3N0c0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nXHJcbiAgICAgICAgICAgIH0pLlxyXG4gICAgICAgICAgICB3aGVuKCcvcG9zdHMvOnBvc3RJZCcsIHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncG9zdC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdwb3N0Q29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgICAgICAgICAgfSkuXHJcbiAgICAgICAgICAgIHdoZW4oJy91c2VycycsIHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndXNlcnMuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAndXNlcnNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xyXG4gICAgICAgICAgICB9KS5cclxuICAgICAgICAgICAgd2hlbignL3VzZXJzLzp1c2VySWQnLCB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3VzZXIuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAndXNlckNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nXHJcbiAgICAgICAgICAgIH0pLlxyXG4gICAgICAgICAgICBvdGhlcndpc2Uoe1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY3RUbzogJy8nXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAod2luZG93Lmhpc3RvcnkgJiYgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKSB7XHJcbiAgICAgICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh7XHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcmVxdWlyZUJhc2U6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdBbmd1bGFyQXBwJylcclxuICAgICAgICAuY29udHJvbGxlcigncG9zdENvbnRyb2xsZXInLCBwb3N0Q29udHJvbGxlcik7XHJcblxyXG4gICAgcG9zdENvbnRyb2xsZXIuaW5qZWN0ID0gWyckcm91dGVQYXJhbXMnLCAncG9zdHNTZXJ2aWNlJywgJ3VzZXJzU2VydmljZScsICdwaG90b3NTZXJ2aWNlJ107XHJcblxyXG4gICAgZnVuY3Rpb24gcG9zdENvbnRyb2xsZXIoJHJvdXRlUGFyYW1zLCBwb3N0c1NlcnZpY2UsIHVzZXJzU2VydmljZSwgcGhvdG9zU2VydmljZSkge1xyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZtLnBvc3RDb21tZW50cyA9ICcnO1xyXG4gICAgICAgIHZtLnBvc3RDb21tZW50c1Byb21pc2UgPSBwb3N0Q29tbWVudHNQcm9taXNlO1xyXG4gICAgICAgIHZtLnBvc3QgPSAnJztcclxuICAgICAgICB2bS5wb3N0UHJvbWlzZSA9IHBvc3RQcm9taXNlO1xyXG4gICAgICAgIHZtLnVzZXIgPSAnJztcclxuICAgICAgICB2bS51c2VyUHJvbWlzZSA9IHVzZXJQcm9taXNlO1xyXG4gICAgICAgIHZtLnBob3RvID0gJyc7XHJcbiAgICAgICAgdm0ucGhvdG9Qcm9taXNlID0gcGhvdG9Qcm9taXNlO1xyXG5cclxuICAgICAgICBhY3RpdmF0ZSgpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcclxuICAgICAgICAgICAgdm0ucG9zdFByb21pc2UoKTtcclxuICAgICAgICAgICAgdm0ucG9zdENvbW1lbnRzUHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBwb3N0UHJvbWlzZSgpIHtcclxuICAgICAgICAgICAgcG9zdHNTZXJ2aWNlLnBvc3RDYWxsKCRyb3V0ZVBhcmFtcy5wb3N0SWQpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLnBvc3QgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLnVzZXJQcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0ucGhvdG9Qcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICB2bS5wb3N0ID0gW107XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZnVuY3Rpb24gcG9zdENvbW1lbnRzUHJvbWlzZSgpIHtcclxuICAgICAgICAgICAgcG9zdHNTZXJ2aWNlLnBvc3RDb21tZW50c0NhbGwoJHJvdXRlUGFyYW1zLnBvc3RJZClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0ucG9zdENvbW1lbnRzID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLnBvc3RDb21tZW50cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9O1xyXG4gICAgICAgIGZ1bmN0aW9uIHVzZXJQcm9taXNlKCkge1xyXG4gICAgICAgICAgICB1c2Vyc1NlcnZpY2UudXNlckNhbGwodm0ucG9zdC51c2VySWQpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLnVzZXIgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0udXNlciA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9O1xyXG4gICAgICAgIGZ1bmN0aW9uIHBob3RvUHJvbWlzZSgpIHtcclxuICAgICAgICAgICAgcGhvdG9zU2VydmljZS5waG90b0NhbGwodm0ucG9zdC51c2VySWQpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLnBob3RvID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLnBob3RvID0gW107XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGFuZ3VsYXJcclxuXHRcdC5tb2R1bGUoJ0FuZ3VsYXJBcHAnKVxyXG5cdFx0LmNvbnRyb2xsZXIoJ3Bvc3RzQ29udHJvbGxlcicsIHBvc3RzQ29udHJvbGxlcik7XHJcblxyXG5cdHBvc3RzQ29udHJvbGxlci5pbmplY3QgPSBbJ3Bvc3RzU2VydmljZScsICd1c2Vyc1NlcnZpY2UnLCAncGhvdG9zU2VydmljZScsJyRzY29wZSddO1xyXG5cclxuXHRmdW5jdGlvbiBwb3N0c0NvbnRyb2xsZXIocG9zdHNTZXJ2aWNlLCB1c2Vyc1NlcnZpY2UsIHBob3Rvc1NlcnZpY2UsICRzY29wZSkge1xyXG5cdFx0XHJcblx0XHR2YXIgdm0gPSB0aGlzO1xyXG5cdFx0ICAvLyAkc2NvcGUudXNlciA9IHtcclxuICAgIC8vICAgbmFtZTogJ01laG1ldCBDYW5rZXInLFxyXG4gICAgLy8gICBhZGRyZXNzOiAnTWlkZGxlIEVhcnRoJ1xyXG4gICAgLy8gfTtcclxuXHRcdHZtLnBob3RvcyA9ICcnO1xyXG5cdFx0dm0ucGhvdG9zUHJvbWlzZSA9IHBob3Rvc1Byb21pc2U7XHJcblx0XHR2bS5wb3N0cyA9ICcnO1xyXG5cdFx0dm0ucG9zdHNQcm9taXNlID0gcG9zdHNQcm9taXNlO1xyXG5cdFx0dm0udXNlcnMgPSAnJztcclxuXHRcdHZtLnVzZXJzUHJvbWlzZSA9IHVzZXJzUHJvbWlzZTtcclxuXHJcblx0XHRhY3RpdmF0ZSgpO1xyXG5cclxuXHRcdGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xyXG5cdFx0XHR2bS5wb3N0c1Byb21pc2UoKTtcclxuXHRcdFx0dm0udXNlcnNQcm9taXNlKCk7XHJcblx0XHRcdHZtLnBob3Rvc1Byb21pc2UoKTtcclxuXHRcdH1cclxuXHRcdGZ1bmN0aW9uIHBvc3RzUHJvbWlzZSgpIHtcclxuXHRcdFx0cG9zdHNTZXJ2aWNlLnBvc3RzQ2FsbCgpXHJcblx0XHRcdFx0LnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdFx0XHRcdHZtLnBvc3RzID0gZGF0YTtcclxuXHRcdFx0XHR9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuXHRcdFx0XHRcdHZtLnBvc3RzID0gW107XHJcblx0XHRcdFx0fSlcclxuXHRcdH07XHJcblx0XHRmdW5jdGlvbiB1c2Vyc1Byb21pc2UoKSB7XHJcblx0XHRcdHVzZXJzU2VydmljZS51c2Vyc0NhbGwoKVxyXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRcdFx0XHR2bS51c2VycyA9IGRhdGE7XHJcblx0XHRcdFx0fSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcblx0XHRcdFx0XHR2bS51c2VycyA9IFtdO1xyXG5cdFx0XHRcdH0pXHJcblx0XHR9O1xyXG5cdFx0ZnVuY3Rpb24gcGhvdG9zUHJvbWlzZSgpIHtcclxuXHRcdFx0cGhvdG9zU2VydmljZS5waG90b3NDYWxsKClcclxuXHRcdFx0XHQudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0XHRcdFx0dm0ucGhvdG9zID0gZGF0YTtcclxuXHRcdFx0XHR9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuXHRcdFx0XHRcdHZtLnBob3RvcyA9IFtdO1xyXG5cdFx0XHRcdH0pXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdBbmd1bGFyQXBwJylcclxuICAgICAgICAuY29udHJvbGxlcigndXNlckNvbnRyb2xsZXInLCB1c2VyQ29udHJvbGxlcik7XHJcblxyXG4gICAgdXNlckNvbnRyb2xsZXIuaW5qZWN0ID0gWyckcm91dGVQYXJhbXMnLCAndXNlcnNTZXJ2aWNlJywgJ3Bob3Rvc1NlcnZpY2UnXTtcclxuXHJcbiAgICBmdW5jdGlvbiB1c2VyQ29udHJvbGxlcigkcm91dGVQYXJhbXMsIHVzZXJzU2VydmljZSwgcGhvdG9zU2VydmljZSkge1xyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZtLnBob3RvID0gJyc7XHJcbiAgICAgICAgdm0ucGhvdG9Qcm9taXNlID0gcGhvdG9Qcm9taXNlO1xyXG4gICAgICAgIHZtLnVzZXIgPSAnJztcclxuICAgICAgICB2bS51c2VyUHJvbWlzZSA9IHVzZXJQcm9taXNlO1xyXG5cclxuICAgICAgICBhY3RpdmF0ZSgpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcclxuICAgICAgICAgICAgdm0udXNlclByb21pc2UoKTtcclxuICAgICAgICAgICAgdm0ucGhvdG9Qcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIHVzZXJQcm9taXNlKCkge1xyXG4gICAgICAgICAgICB1c2Vyc1NlcnZpY2UudXNlckNhbGwoJHJvdXRlUGFyYW1zLnVzZXJJZClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0udXNlciA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICB2bS51c2VyID0gW107XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZnVuY3Rpb24gcGhvdG9Qcm9taXNlKCkge1xyXG4gICAgICAgICAgICBwaG90b3NTZXJ2aWNlLnBob3RvQ2FsbCgkcm91dGVQYXJhbXMudXNlcklkKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2bS5waG90byA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICB2bS5waG90byA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRhbmd1bGFyXHJcblx0XHQubW9kdWxlKCdBbmd1bGFyQXBwJylcclxuXHRcdC5jb250cm9sbGVyKCd1c2Vyc0NvbnRyb2xsZXInLCB1c2Vyc0NvbnRyb2xsZXIpO1xyXG5cclxuXHR1c2Vyc0NvbnRyb2xsZXIuaW5qZWN0ID0gWyd1c2Vyc1NlcnZpY2UnLCAncGhvdG9zU2VydmljZSddO1xyXG5cclxuXHRmdW5jdGlvbiB1c2Vyc0NvbnRyb2xsZXIodXNlcnNTZXJ2aWNlLCBwaG90b3NTZXJ2aWNlKSB7XHJcblx0XHR2YXIgdm0gPSB0aGlzO1xyXG5cclxuXHRcdHZtLnBob3RvcyA9ICcnO1xyXG5cdFx0dm0ucGhvdG9zUHJvbWlzZSA9IHBob3Rvc1Byb21pc2U7XHJcblx0XHR2bS51c2VycyA9ICcnO1xyXG5cdFx0dm0udXNlcnNQcm9taXNlID0gdXNlcnNQcm9taXNlO1xyXG5cclxuXHRcdGFjdGl2YXRlKCk7XHJcblxyXG5cdFx0ZnVuY3Rpb24gYWN0aXZhdGUoKSB7XHJcblx0XHRcdHZtLnVzZXJzUHJvbWlzZSgpO1xyXG5cdFx0XHR2bS5waG90b3NQcm9taXNlKCk7XHJcblx0XHR9XHJcblx0XHRmdW5jdGlvbiB1c2Vyc1Byb21pc2UoKSB7XHJcblx0XHRcdHVzZXJzU2VydmljZS51c2Vyc0NhbGwoKVxyXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRcdFx0XHR2bS51c2VycyA9IGRhdGE7XHJcblx0XHRcdFx0fSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcblx0XHRcdFx0XHR2bS51c2VycyA9IFtdO1xyXG5cdFx0XHRcdH0pXHJcblx0XHR9O1xyXG5cdFx0ZnVuY3Rpb24gcGhvdG9zUHJvbWlzZSgpIHtcclxuXHRcdFx0cGhvdG9zU2VydmljZS5waG90b3NDYWxsKClcclxuXHRcdFx0XHQudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0XHRcdFx0dm0ucGhvdG9zID0gZGF0YTtcclxuXHRcdFx0XHR9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuXHRcdFx0XHRcdHZtLnBob3RvcyA9IFtdO1xyXG5cdFx0XHRcdH0pXHJcblx0XHR9O1xyXG5cdH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdBbmd1bGFyQXBwJylcclxuICAgICAgICAuZmFjdG9yeSgnY29tbWVudHNTZXJ2aWNlJywgY29tbWVudHNTZXJ2aWNlKTtcclxuXHJcbiAgICBjb21tZW50c1NlcnZpY2UuJGluamVjdCA9IFsnY29uZmlnJywgJ2h0dHBTZXJ2aWNlJ107XHJcblxyXG4gICAgZnVuY3Rpb24gY29tbWVudHNTZXJ2aWNlKGNvbmZpZywgaHR0cFNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgc2VydmljZSA9IHtcclxuICAgICAgICAgICAgY29tbWVudHNDYWxsOiBjb21tZW50c0NhbGwsXHJcbiAgICAgICAgICAgIGNvbW1lbnRDYWxsOiBjb21tZW50Q2FsbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNvbW1lbnRzQ2FsbCgpIHtcclxuICAgICAgICAgICAgdmFyIGNvbW1lbnRzVXJsID0gY29uZmlnLnJvb3QgKyAnL2NvbW1lbnRzJztcclxuICAgICAgICAgICAgcmV0dXJuIGh0dHBTZXJ2aWNlLmdldENhbGwoY29tbWVudHNVcmwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjb21tZW50Q2FsbChjb21tZW50SWQpIHtcclxuICAgICAgICAgICAgdmFyIGNvbW1lbnRzVXJsID0gY29uZmlnLnJvb3QgKyAnL2NvbW1lbnRzLycgKyBjb21tZW50SWQ7XHJcbiAgICAgICAgICAgIHJldHVybiBodHRwU2VydmljZS5nZXRDYWxsKGNvbW1lbnRzVXJsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnQW5ndWxhckFwcCcpXHJcbiAgICAgICAgLmZhY3RvcnkoJ2h0dHBTZXJ2aWNlJywgaHR0cFNlcnZpY2UpO1xyXG5cclxuICAgIGh0dHBTZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJywgJyRxJ107XHJcblxyXG4gICAgZnVuY3Rpb24gaHR0cFNlcnZpY2UoJGh0dHAsICRxKSB7XHJcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XHJcbiAgICAgICAgICAgIGdldENhbGw6IGdldENhbGxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRDYWxsKHVybCkge1xyXG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG4gICAgICAgICAgICAkaHR0cC5nZXQodXJsKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5kYXRhID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChyZXNwb25zZS5kYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgZ2V0dGluZyBkYXRhIGZyb20nLCB1cmwsIGVycm9yKVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdBbmd1bGFyQXBwJylcclxuICAgICAgICAuZmFjdG9yeSgncGhvdG9zU2VydmljZScsIHBob3Rvc1NlcnZpY2UpO1xyXG5cclxuICAgIHBob3Rvc1NlcnZpY2UuJGluamVjdCA9IFsnY29uZmlnJywgJ2h0dHBTZXJ2aWNlJ107XHJcblxyXG4gICAgZnVuY3Rpb24gcGhvdG9zU2VydmljZShjb25maWcsIGh0dHBTZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XHJcbiAgICAgICAgICAgIHBob3Rvc0NhbGw6IHBob3Rvc0NhbGwsXHJcbiAgICAgICAgICAgIHBob3RvQ2FsbDogcGhvdG9DYWxsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2VydmljZTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcGhvdG9zQ2FsbCgpIHtcclxuICAgICAgICAgICAgdmFyIHBob3Rvc1VybCA9IGNvbmZpZy5yb290ICsgJy9waG90b3MnO1xyXG4gICAgICAgICAgICByZXR1cm4gaHR0cFNlcnZpY2UuZ2V0Q2FsbChwaG90b3NVcmwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBwaG90b0NhbGwocGhvdG9JZCkge1xyXG4gICAgICAgICAgICB2YXIgcGhvdG9zVXJsID0gY29uZmlnLnJvb3QgKyAnL3Bob3Rvcy8nICsgcGhvdG9JZDtcclxuICAgICAgICAgICAgcmV0dXJuIGh0dHBTZXJ2aWNlLmdldENhbGwocGhvdG9zVXJsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnQW5ndWxhckFwcCcpXHJcbiAgICAgICAgLmZhY3RvcnkoJ3Bvc3RzU2VydmljZScsIHBvc3RzU2VydmljZSk7XHJcblxyXG4gICAgcG9zdHNTZXJ2aWNlLiRpbmplY3QgPSBbJ2NvbmZpZycsICdodHRwU2VydmljZSddO1xyXG5cclxuICAgIGZ1bmN0aW9uIHBvc3RzU2VydmljZShjb25maWcsIGh0dHBTZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XHJcbiAgICAgICAgICAgIHBvc3RzQ2FsbDogcG9zdHNDYWxsLFxyXG4gICAgICAgICAgICBwb3N0Q2FsbDogcG9zdENhbGwsXHJcbiAgICAgICAgICAgIHBvc3RDb21tZW50c0NhbGw6IHBvc3RDb21tZW50c0NhbGxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBwb3N0c0NhbGwoKSB7XHJcbiAgICAgICAgICAgIHZhciBwb3N0c1VybCA9IGNvbmZpZy5yb290ICsgJy9wb3N0cyc7XHJcbiAgICAgICAgICAgIHJldHVybiBodHRwU2VydmljZS5nZXRDYWxsKHBvc3RzVXJsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gcG9zdENhbGwocG9zdElkKSB7XHJcbiAgICAgICAgICAgIHZhciBwb3N0c1VybCA9IGNvbmZpZy5yb290ICsgJy9wb3N0cy8nICsgcG9zdElkO1xyXG4gICAgICAgICAgICByZXR1cm4gaHR0cFNlcnZpY2UuZ2V0Q2FsbChwb3N0c1VybCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIHBvc3RDb21tZW50c0NhbGwocG9zdElkKSB7XHJcbiAgICAgICAgICAgIHZhciBwb3N0c1VybCA9IGNvbmZpZy5yb290ICsgJy9wb3N0cy8nICsgcG9zdElkICsgJy9jb21tZW50cyc7XHJcbiAgICAgICAgICAgIHJldHVybiBodHRwU2VydmljZS5nZXRDYWxsKHBvc3RzVXJsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnQW5ndWxhckFwcCcpXHJcbiAgICAgICAgLmZhY3RvcnkoJ3VzZXJzU2VydmljZScsIHVzZXJzU2VydmljZSk7XHJcblxyXG4gICAgdXNlcnNTZXJ2aWNlLiRpbmplY3QgPSBbJ2NvbmZpZycsICdodHRwU2VydmljZSddO1xyXG5cclxuICAgIGZ1bmN0aW9uIHVzZXJzU2VydmljZShjb25maWcsIGh0dHBTZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XHJcbiAgICAgICAgICAgIHVzZXJzQ2FsbDogdXNlcnNDYWxsLFxyXG4gICAgICAgICAgICB1c2VyQ2FsbDogdXNlckNhbGxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB1c2Vyc0NhbGwoKSB7XHJcbiAgICAgICAgICAgIHZhciB1c2Vyc1VybCA9IGNvbmZpZy5yb290ICsgJy91c2Vycyc7XHJcbiAgICAgICAgICAgIHJldHVybiBodHRwU2VydmljZS5nZXRDYWxsKHVzZXJzVXJsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gdXNlckNhbGwodXNlcklkKSB7XHJcbiAgICAgICAgICAgIHZhciB1c2Vyc1VybCA9IGNvbmZpZy5yb290ICsgJy91c2Vycy8nICsgdXNlcklkO1xyXG4gICAgICAgICAgICByZXR1cm4gaHR0cFNlcnZpY2UuZ2V0Q2FsbCh1c2Vyc1VybCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpOyIsIiAoZnVuY3Rpb24gKCkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcbiBhbmd1bGFyXHJcblx0XHQubW9kdWxlKCdBbmd1bGFyQXBwJylcclxuXHRcdC5kaXJlY3RpdmUoJ3BhZ2VIZWFkaW5nJywgZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0ZW1wbGF0ZTogJzxoMT5Bbmd1bGFyIFNhbXBsZSBBcHBsaWNhdGlvbiA8L2gxPidcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIH0pKCk7Il19
