app.controller('ProfilePageCtrl', ['$scope', '$http','$routeParams', '$location', 'Upload', '$timeout', function ($scope, $http ,$routeParams, $location, Upload, $timeout) {

	var userName = $routeParams.id

	$scope.projects = []

	$http.get('/api/users/' + userName)
  		.then(function(response) {
  
	  		$scope.user = response.data;

	  		$scope.projects = response.data.projects;

  		}, function(response) {

  			$location.path('/404');
  	});

  	$scope.updateProfile = function (user) {

	  	$http.put('/api/me', user)
	  		.then(function(response) {

		  		$location.path('/' + userName);


	  		}, function(response) {

	  			$location.path('/500');
	  	});

  	}

}]);