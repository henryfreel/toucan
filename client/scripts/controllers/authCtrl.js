
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

              var loggedInUser = response.data.username
              $location.path('/' + loggedInUser);

            }, function(response) {
            });

        })
        .catch(function(response) {
          // toastr.error(response.data.message, response.status);
        });
    };

}]);

app.controller('SignupCtrl', ['$rootScope','$scope', '$auth', '$location', '$http', function ($rootScope, $scope, $auth, $location, $http) {

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

              var loggedInUser = response.data.username
              $location.path('/' + loggedInUser); 

              }, function(response) {
              });

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