function LastFmCtrl($scope, $http, $timeout) {
	$scope.tracks = [];
	!function tick() {
		$http({method: 'GET', url: 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=nickelpro&api_key=ffd9e00b1647c0824ce7cb0a0aa44ce1&format=json'}).
		success(function(data, status, headers, config) {
			$scope.tracks = [];
			for(var i=0;i<data.recenttracks.track.length;i++) {
				var track = data.recenttracks.track[i];
				if (typeof track.date != 'undefined') {
					track.time = moment.unix(track.date.uts).fromNow();
				} else {
					track.time = 'Now Playing';
				}
				track.artist_url = track.url.substring(0, track.url.lastIndexOf('/')-2);
			}
			$scope.tracks = data.recenttracks.track;
			$timeout(tick, 60000);
		}).
		error(function(data, status, headers, config) {
			$timeout(tick, 60000);
		});
	}();
};