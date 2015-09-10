app.controller('ProfilePageCtrl', ['$scope', '$http','$routeParams', '$location', 'Upload', '$timeout', function ($scope, $http ,$routeParams, $location, Upload, $timeout) {

	var userName = $routeParams.id

	$scope.projects = []

	$http.get('/api/users/' + userName)
  		.then(function(response) {
  
	  		$scope.user = response.data;

	  		$scope.projects = response.data.projects;

  		}, function(response) {

  			$location.path('/404');
  	});

  	$scope.updateProfile = function (user) {

	  	$http.put('/api/me', user)
	  		.then(function(response) {

		  		$location.path('/' + userName);


	  		}, function(response) {

	  			$location.path('/500');
	  	});

  	}

  	$scope.uploadPic = function(file) {
	    file.upload = Upload.upload({
	    	url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
	    	method: 'POST',
	    	headers: {
	        	'my-header': 'my-header-value'
	    	},
	    	fields: {username: $scope.username},
	    	file: file,
	    	fileFormDataName: 'myFile'
	    });

	    file.upload.then(function (response) {
	    	$timeout(function () {
	        	file.result = response.data;
	    	});
	    }, function (response) {
	    	if (response.status > 0)
	        	$scope.errorMsg = response.status + ': ' + response.data;
	    });

	    file.upload.progress(function (evt) {
	    	// Math.min is to fix IE which reports 200% sometimes
	    	file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
	    });
    }



}]);