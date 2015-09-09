app.controller('SignupCtrl', ['$scope', '$auth', '$location', function ($scope, $auth, $location) {

	$scope.authenticate = function(provider) {
	  $auth.authenticate(provider);
	};

	$scope.user = {};

  $scope.signup = function() {
    $auth.signup($scope.user)
      .then(function() {
        // $location.path('/login');
        // console.log('You have successfully created a new account');

        $auth.login($scope.user)
          .then(function() {
            // toastr.success('You have successfully signed in');

            $http.get('/api/me')
              .then(function(response) {
            
                $rootScope.currentUser = response.data; 

              }, function(response) {
              });

            var userName = $rootScope.currentUser

            $location.path('/' + userName);
          })
          .catch(function(response) {
            // toastr.error(response.data.message, response.status);
          });

      })
      .catch(function(response) {
        console.log(response.data.message)
      });
  };

}]);