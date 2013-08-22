function LastFmCtrl($scope, $http, $timeout) {
	!function tick() {
		$http({method: 'GET', url: 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=nickelpro&api_key=ffd9e00b1647c0824ce7cb0a0aa44ce1&format=json'}).
		success(function(data, status, headers, config) {
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

function BlogFeedCtrl($scope, $http) {
	!function() {
		$http({method: 'JSONP', url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://blog.nickg.org/atom.xml&callback=JSON_CALLBACK'}).
		success(function(data, status, headers, config) {
			$scope.articles = [];
			for(var i=0;(i<data.responseData.feed.entries.length && i<8);i++) {
				var article = data.responseData.feed.entries[i];
				article.time = moment(article.publishedDate).format('LL');
				$scope.articles[i] = article;
			}
		});
	}();
};

function GithubRepoCtrl($scope, $http) {
	!function() {
		$http({method: 'GET', url: 'https://api.github.com/users/nickelpro/repos?sort=pushed'}).
		success(function(data, status, headers, config) {
			$scope.repos = [];
			for(var i=0;(i<data.length && i<5);i++) {
				data[i].time = moment(data[i].updated_at).format('LL');
				if (data[i].language == null) {
					data[i].language = 'Unknown';
				}
				$scope.repos[i] = data[i];
			}
		});
	}();
};