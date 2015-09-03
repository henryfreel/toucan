
app.controller('LoginCtrl', ['$scope', '$location', '$auth', 'toastr', function ($scope, $location, $auth, toastr) {

	// $scope.login = function() {
	// 	$auth.login($scope.user)
	// 	    .then(function() {
	// 	      toastr.success('You have successfully signed in');
	// 	      $location.path('/');
	// 	    })
	// 	    .catch(function(response) {
	// 	      toastr.error(response.data.message, response.status);
	// 	    });
	// 	};
	$scope.authenticate = function(provider) {
		$auth.authenticate(provider)
		    .then(function() {
		      toastr.success('You have successfully signed in with ' + provider);
		      $location.path('/');
		    })
		    .catch(function(response) {
		      toastr.error(response.data.message);
		    });
		};

	$scope.login = function() {
	  $auth.login($scope.login_user)
	    .then(function(response) {
	      //hide modal
	      $('#login-modal').modal('hide');
	      //flash alert
	      Alert.add('success', "Login Successful", 5000);
	    })
	    .catch(function(err) {
	      Alert.add('danger', err.data.message, 5000);
	    });
	  $scope.login_user = {};
	}

}]);