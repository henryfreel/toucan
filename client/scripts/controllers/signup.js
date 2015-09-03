app.controller('SignupCtrl', ['$scope', '$auth', function ($scope, $auth) {

	$scope.authenticate = function(provider) {
	  $auth.authenticate(provider);
	};

	$scope.user = {};
	
	app.controller('SignupCtrl', function($scope, $location, $auth, toastr) {
	    $scope.signup = function() {
	      $auth.signup($scope.user)
	        .then(function() {
	          $location.path('/login');
	          toastr.info('You have successfully created a new account');
	        })
	        .catch(function(response) {
	          toastr.error(response.data.message);
	        });
    };

	$scope.signUp = function(){
	    User.save($scope.user);
	    $scope.user = {};
	};

}]);