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