var app = angular.module('tukanApp', ['ngRoute', 
                                      'ngMessages', 
                                      'satellizer',
                                      'ngSanitize']);

app.config(['$routeProvider', '$locationProvider', '$authProvider', function ($routeProvider, $locationProvider, $authProvider) {

    $routeProvider.
        when('/', {
          	templateUrl: 'templates/projects',
          	controller: 'ProjectsCtrl'
        })
        .when('/projects/new', {
            templateUrl: 'templates/new-project',
            controller: 'NewProjectCtrl'
        })
        .when('/projects/:id/edit', {
            templateUrl: 'templates/edit-project',
            controller: 'ProjectCtrl'
        })
        .when('/projects/:id', {
            templateUrl: 'templates/project',
            controller: 'ProjectCtrl'
        })
        .when('/users', {
            templateUrl: 'templates/users',
            controller: 'UsersCtrl'
        })
        .when('/login', {
            templateUrl: 'templates/login',
            controller: 'LoginCtrl'
          })
        .when('/signup', {
            templateUrl: 'templates/signup',
            controller: 'SignupCtrl'
          })
        .when('/404', {
            templateUrl: 'templates/404',
            controller: 'MainCtrl'
        })
        .when('/500', {
            templateUrl: 'templates/500',
            controller: 'MainCtrl'
        })
        .when('/:id/edit', {
            templateUrl: 'templates/edit-profile',
            controller: 'ProfilePageCtrl'
        })
        .when('/:id', {
            templateUrl: 'templates/profile',
            controller: 'ProfilePageCtrl'
        })
        .otherwise({
        	redirectTo: '/'
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











