app.controller('ProfilePageCtrl', ['$scope', '$http','$routeParams', '$location', function ($scope, $http ,$routeParams, $location, Upload, $timeout) {

  var userName = $routeParams.id
  $scope.projects = []

  $http.get('/api/users/' + userName)
      .then(function (response) {
        $scope.user = response.data;
        $scope.projects = response.data.projects;
      }, function (response) {
        $location.path('/404');
    });

    $scope.updateProfile = function (user) {
      $http.put('/api/me', user)
        .then(function (response) {
          $location.path('/' + userName);
        }, function (response) {
          $location.path('/500');
      });
    }

    $scope.markedOnView = function (content) {
      if (content != undefined) {
        return marked(content);
      }
    }

    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false, // if false -> allow plain old HTML ;)
      smartLists: true,
      smartypants: false,
      highlight: function (code, lang) {
        if (lang) {
          return hljs.highlight(lang, code).value;
        } else {
          return hljs.highlightAuto(code).value;
        }
      }
    });

}]);

app.controller('UsersCtrl', ['$rootScope','$scope', '$auth', '$location', '$http', function ($rootScope, $scope, $auth, $location, $http) {
}])