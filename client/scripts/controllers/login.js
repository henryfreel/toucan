
app.controller('LoginCtrl', ['$rootScope','$scope', '$location', '$auth','$http', function ($rootScope, $scope, $location, $auth, $http) {

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
        .then(function(response) {
          // toastr.success('You have successfully signed in');

          $http.get('/api/me')
            .then(function(response) {
          
              $rootScope.currentUser = response.data; 

            }, function(response) {
            });

          $location.path('/profile');
        })
        .catch(function(response) {
          // toastr.error(response.data.message, response.status);
        });
    };

}]);