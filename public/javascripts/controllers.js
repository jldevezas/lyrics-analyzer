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

app.controller('AnalyzeCtrl', [
		'$scope',
		'LyricsFactory',
		'WordCloud',
		function($scope, LyricsFactory, WordCloud) {
			$scope.hideLoader = false;

			LyricsFactory.get({}, function(lyricsFactory) {
				$scope.lyricsList = lyricsFactory.data;
				$scope.hideLoader = true;
			});

			$scope.preview = function(text) {
				return text.split('\n\n')[0] + "\n[...]";
			};

			$scope.updateWordCloud = function() {
				if ($scope.lyricsList !== undefined
						&& $scope.lyricsList !== null) {

					var checkedLyrics = $scope.lyricsList.filter(function(
							lyrics) {
						return lyrics.checked;
					});
					
					if (checkedLyrics.length <= 0) {
						return;
					}

					$("#cloud svg").remove();
					$("#cloud .message").css("display", "none");
					$("#cloud .loader").css("display", "block");

					var selectedText = "";
					for (var i = 0; i < checkedLyrics.length; i++) {
						selectedText += " " + checkedLyrics[i].text;
					}

					WordCloud.async(selectedText);
				}
			};
		} ]);