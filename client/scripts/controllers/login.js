
app.controller('LoginCtrl', ['$scope', '$location', '$auth', function ($scope, $location, $auth) {

	$scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          // toastr.success('You have successfully signed in with ' + provider);
          $location.path('/');
        })
        .catch(function(response) {
          toastr.error(response.data.message);
        });
    };

	$scope.login = function() {
      $auth.login($scope.user)
        .then(function() {
          // toastr.success('You have successfully signed in');
          $location.path('/');
        })
        .catch(function(response) {
          // toastr.error(response.data.message, response.status);
        });
    };

}]);