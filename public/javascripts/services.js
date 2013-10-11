var services = angular.module('app.services', [ 'ngResource' ]);

services.factory('LyricsFactory', function($resource) {
	return $resource('/api/lyrics', {}, {
		query : {
			method : 'GET',
			params : {},
			isArray : false
		}
	})
});