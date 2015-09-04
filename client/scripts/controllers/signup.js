app.controller('SignupCtrl', ['$scope', '$auth', '$location', function ($scope, $auth, $location) {

	$scope.authenticate = function(provider) {
	  $auth.authenticate(provider);
	};

	// $scope.user = {};

    $scope.signup = function() {
      $auth.signup($scope.user)
        .then(function() {
          $location.path('/');
          // toastr.info('You have successfully created a new account');
          console.log('You have successfully created a new account');
        })
        .catch(function(response) {
          // toastr.error(response.data.message);
          console.log(response.data.message)
        });
    };

}]);