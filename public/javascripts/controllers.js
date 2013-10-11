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

app.controller('LyricsSelectCtrl', [
		'$rootScope',
		'$scope',
		'LyricsFactory',
		function($rootScope, $scope, LyricsFactory) {
			$scope.hideLoader = false;

			LyricsFactory.get({}, function(lyricsFactory) {
				$scope.lyricsList = lyricsFactory.data;
				$scope.hideLoader = true;
			});

			$scope.preview = function(text) {
				return text.split('\n\n')[0] + "\n[...]";
			};

			$scope.$watch('lyricsList', function(lyricsList) {
				console.log('update text');
			}, true);

			$scope.updateSelectedText = function() {
				console.log("clicked");
				if ($scope.lyricsList === undefined
						|| $scope.lyricsList === null) {
					return;
				}

				var selectedText = "";
				for (var i = 0; i < $scope.lyricsList.length; i++) {
					if ($scope.lyricsList[i].checked) {
						selectedText += " " + $scope.lyricsList[i].text;
					}
				}
				// $rootScope.$broadcast('UPDATE_SELECTED_TEXT', selectedText);
			};
		} ]);

app.controller('LyricsCloudCtrl', function($scope) {
	$scope.$on('UPDATE_SELECTED_TEXT', function(event, selectedText) {
		console.log(event);
		var c = new Cloud(selectedText);
		c.makeCloud("#cloud");
	});
});