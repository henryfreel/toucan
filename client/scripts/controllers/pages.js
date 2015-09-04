app.controller('FirstPageCtrl', ['$scope', '$route', function ($scope, $route) {

	$scope.test = "this is the first page!";
	// $scope.$route = $route;

}]);

app.controller('SecondPageCtrl', ['$scope', '$route', function ($scope, $route) {

	$scope.test = "this is the second page!";
	// $scope.$route = $route;

}]);