function LastFmCtrl($scope, $http, $timeout) {
	$scope.tracks = [];
	!function tick() {
		$http({method: 'GET', url: 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=nickelpro&api_key=ffd9e00b1647c0824ce7cb0a0aa44ce1&format=json'}).
		success(function(data, status, headers, config) {
			$scope.tracks = data.recenttracks.track;
			$timeout(tick, 5000);
		}).
		error(function(data, status, headers, config) {
			$timeout(tick, 5000);
		});
	}();
};