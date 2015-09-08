// var app = angular.module('tukanApp')

app.controller('MainCtrl', ['$rootScope','$scope', '$location', '$auth', '$http', function ($rootScope, $scope, $location, $auth, $http) {

	// $rootScope.pageClass = "grey-page";

	$scope.isActive = function(route) {
        return route === $location.path();
    }

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    $scope.logout = function() {

    	if (!$auth.isAuthenticated()) { return; }

    	$auth.logout()
    	  .then(function() {
    	    // toastr.info('You have been logged out');

            $rootScope.currentUser = null;

    	    $location.path('/');
    	  });

    }

    if ($auth.isAuthenticated()) {

        $http.get('/api/me')
            .then(function(response) {
          
              $rootScope.currentUser = response.data; 

            }, function(response) {
            });

    }

    $scope.$on('$locationChangeSuccess', function() {
        var path = $location.path();
        if (path === '/projects') {
            $scope.pageClass = "grey-page";
        } else {
            $scope.pageClass = "white-page";
        }
    });

    // $scope.$on('$locationChangeSuccess', function() {
    //     var path = $location.path();
    //     $scope.bodyClass = (path==='/room' || path==='/frontdesk') ? 'dark' : 'white';
    // });

    // $http.get('/api/me')
    //     .then(function(response) {

    //         $scope.user = response.data;

    //     }, function(response) {
    //     // error
    //     });

}]);






