// var app = angular.module('tukanApp')

app.controller('MainCtrl', ['$scope', '$location', '$auth', function ($scope, $location, $auth) {

	$scope.test = "The app is working!";

	$scope.isActive = function(route) {
        return route === $location.path();
    }

    $scope.isAuthenticated = function() {
      // console.log("is authenitcated fired");
      // console.log($auth.isAuthenticated());
      return $auth.isAuthenticated();
    };

    $scope.logout = function() {

    	if (!$auth.isAuthenticated()) { return; }

    	$auth.logout()
    	  .then(function() {
    	    // toastr.info('You have been logged out');
    	    console.log(localStorage);
    	    $location.path('/');
    	  });

    }

}]);