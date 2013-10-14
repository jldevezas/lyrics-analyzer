var modules = angular.module('app.modules', []);

modules.factory('WordCloud', function($timeout) {
	var WordCloud = {};
	var cloud = new Cloud("#cloud");
	
	WordCloud.async = function(text) {
		$timeout(function() {
			cloud.makeCloud(text);
			$("#cloud .loader").css("display", "none");
		}, 5000);
	};
	
	return WordCloud;
});
