// removed -> , 'App.controllers'
var app = angular.module('tukanApp', ['ngRoute', 'ngMessages', 'satellizer','ngSanitize']);

app.config(['$routeProvider', '$locationProvider', '$authProvider', function ($routeProvider, $locationProvider, $authProvider) {

    $routeProvider.
        when('/projects', {
        	templateUrl: '/views/templates/projects.html',
        	controller: 'ProjectsCtrl'
        })
        .when('/projects/new', {
            templateUrl: '/views/templates/new-project.html',
            controller: 'NewProjectCtrl'
        })
        .when('/projects/:id', {
            templateUrl: '/views/templates/project.html',
            controller: 'ProjectCtrl'
        })
        .when('/login', {
            templateUrl: 'views/templates/login.html',
            controller: 'LoginCtrl'
          })
        .when('/signup', {
            templateUrl: '/views/templates/signup.html',
            controller: 'SignupCtrl'
          })
        .when('/404', {
            templateUrl: '/views/404.html',
            controller: 'MainCtrl'
        })
        .when('/:id/edit', {
            templateUrl: '/views/templates/edit-profile.html',
            controller: 'ProfilePageCtrl'
        })
        .when('/:id', {
            templateUrl: '/views/templates/profile.html',
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











