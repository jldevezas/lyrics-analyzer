'use strict';

app.controller('NavCtrl', function($scope, $location) {
	$scope.isActive = function(route) {
		return route === $location.path();
	}
});

app.controller('UploadFormCtrl', function($scope, $http) {
	$scope.status = null;

	$scope.submit = function(user) {
		$http({
			method : 'POST',
			url : '/api/lyrics',
			data : JSON.stringify($scope.lyrics),
			headers : {
				"Content-Type" : "application/json"
			}

		}).success(function(result) {
			console.log(result);
			if (result.success) {
				$scope.status = {
					success : result.success
				};
			}

			if (result.error) {
				$scope.status = {
					error : result.error
				};
			}
		});
	};
});