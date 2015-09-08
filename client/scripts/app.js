// removed -> , 'App.controllers'
var app = angular.module('tukanApp', ['ngRoute', 'ngMessages', 'satellizer']);

app.config(['$routeProvider', '$locationProvider', '$authProvider', function ($routeProvider, $locationProvider, $authProvider) {

    $routeProvider.
        when('/projects', {
        	templateUrl: 'views/templates/projects.html',
        	controller: 'ProjectsPageCtrl'
        })
        .when('/projects/:id', {
            templateUrl: '/views/templates/project.html',
            controller: 'ProjectPageCtrl'
        })
        .when('/login', {
            templateUrl: 'views/templates/login.html',
            controller: 'LoginCtrl'
          })
        .when('/signup', {
            templateUrl: 'views/templates/signup.html',
            controller: 'SignupCtrl'
          })
        .when('/:id', {
            templateUrl: 'views/templates/profile-page.html',
            controller: 'ProfilePageCtrl'
        })
        .otherwise({
        	redirectTo: '/projects'
        });
 
    $authProvider.github({
      clientId: '0ba2600b1dbdb756688b'
    });

    $authProvider.twitter({
      url: '/auth/twitter'
    });

    // Get rid of '#' in URL, may only work with server
    // use the HTML5 History API
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});


}]);
