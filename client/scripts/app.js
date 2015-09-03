// removed -> , 'App.controllers'
var app = angular.module('canopyApp', ['ngRoute', 'ngMessages', 'satellizer']);

app.config(['$routeProvider', '$locationProvider', '$authProvider', function ($routeProvider, $locationProvider, $authProvider) {

    $routeProvider.
    	when('/', {
        	templateUrl: 'views/templates/home.html',
        	controller: 'HomeCtrl'
        })
        .when('/first-page', {
        	templateUrl: 'views/templates/first-page.html',
        	controller: 'FirstPageCtrl'
        })
        .when('/second-page', {
        	templateUrl: 'views/templates/second-page.html',
        	controller: 'SecondPageCtrl'
        })
        .when('/login', {
            templateUrl: 'views/templates/login.html',
            controller: 'LoginCtrl'
          })
        .when('/signup', {
            templateUrl: 'views/templates/signup.html',
            controller: 'SignupCtrl'
          })
        .when('/photo/:id', {
            templateUrl: 'views/templates/detail.html',
            controller: 'DetailCtrl'
          })
        .otherwise({
        	redirectTo: '/'
        });

    $authProvider.facebook({
          clientId: '624059410963642',
        });
     
    $authProvider.google({
      clientId: '631036554609-v5hm2amv4pvico3asfi97f54sc51ji4o.apps.googleusercontent.com'
    });
 
    $authProvider.github({
      clientId: '0ba2600b1dbdb756688b'
    });
 
    $authProvider.linkedin({
      clientId: '77cw786yignpzj'
    });
 
    $authProvider.twitter({
      url: '/auth/twitter'
    });
 
    $authProvider.oauth2({
      name: 'foursquare',
      url: '/auth/foursquare',
      redirectUri: window.location.origin,
      clientId: 'MTCEJ3NGW2PNNB31WOSBFDSAD4MTHYVAZ1UKIULXZ2CVFC2K',
      authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate',
    });

    // Get rid of '#' in URL, may only work with server
    // use the HTML5 History API
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});

}]);
