app.controller('ProfilePageCtrl', ['$scope', '$location', '$auth', function ($scope, $location, $auth) {

  $scope.getProfile = function() {
    Account.getProfile()
      .then(function(response) {
        $scope.user = response.data;
      })
      .catch(function(response) {
        // toastr.error(response.data.message, response.status);
      });
  };

}]);