app.controller('ProfilePageCtrl', ['$scope', '$http','$routeParams', '$location',function ($scope, $http ,$routeParams, $location) {

	var userName = $routeParams.id

	$scope.projects = []

	$http.get('/api/users/' + userName)
  		.then(function(response) {
  
	  		$scope.user = response.data;

	  		$scope.projects = response.data.projects;

	  		console.log(response.data.projects);

  		}, function(response) {

  			$location.path('/404');
  	});

  	// $http.get('/api/users/' + userName + '/projects')
  	// 	.then(function(response) {

	  // 		$scope.projects = response.data.projects;

  	// 	}, function(response) {

  	// 		$location.path('/404');
  	// });

}]);