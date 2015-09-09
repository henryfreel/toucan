app.controller('ProfilePageCtrl', ['$scope', '$http','$routeParams', '$location',function ($scope, $http ,$routeParams, $location) {

  var userName = $routeParams.id

	$http.get('/api/users/' + userName)
  		.then(function(response) {
  
	  		$scope.user = response.data;

  		}, function(response) {

  			$location.path('/404');
  	});

}]);