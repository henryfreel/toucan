app.controller('NewProjectCtrl', ['$rootScope', '$scope', '$location', '$routeParams', '$http', function ($rootScope, $scope, $location, $routeParams, $http) {

	$scope.project = {};

	$scope.newProject = function() {

		$scope.project.user = $rootScope.currentUser

		var projectTitle = $scope.project.title;
		var projectSummary = $scope.project.summary;

		$scope.project.content = '### **Here is the story of ' + projectTitle + '**' + '\nWe\'ve started your project\'s story, in MarkDown! **Click on the edit button to add more!**';
	    
		$http.post('/api/projects/new', $scope.project)
			.then(function(response) {

				var projectId = response.data._id
				$location.path('/projects/' + projectId);

			}, function(response) {

				$location.path('/500');

			});

	};


}]);

app.controller('ProjectCtrl', ['$rootScope', '$scope', '$location', '$routeParams', '$http', function ($rootScope, $scope, $location, $routeParams, $http) {

	var projectId = $routeParams.id

	// var projectThing = this;  // alias for 'this', so we can access it in $scope.$watch

	$http.get('/api/projects/' + projectId)
		.then(function(response) {
				
			$scope.project = response.data;

			$scope.project.content = response.data.content;

		}, function(response) {

			$location.path('/404');

		});

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

	$scope.updateProject = function (project) {

		console.log("You clicked the update project button");

	  	$http.put('/api/projects/' + projectId + '/edit', project)
	  		.then(function(response) {

		  		$location.path('/projects/' + projectId);


	  		}, function(response) {

	  			$location.path('/500');
	  	});

  	}

	$scope.deleteProject = function (project) {

		$http.delete('/api/projects/' + projectId, project)
			.then(function(response) {

				$location.path('/' + $rootScope.currentUser.username);

			}, function(response) {

				$location.path('/500');

			});

	}


}]);

app.controller('ProjectsCtrl', ['$rootScope', '$scope', '$location', '$http', function ($rootScope, $scope, $routeParams, $http) {

	$scope.project = "huh?";

	$http.get('/api/projects')
		.then(function(response) {
				
			$scope.projects = response.data;

			// $scope.project.content = response.data.content;

		}, function(response) {

			$location.path('/404');

		});

}]);

app.directive('ngConfirmClick', [
	function(){
    	return {
        	link: function (scope, element, attr) {
            	var msg = attr.ngConfirmClick || "Are you sure?";
            	var clickAction = attr.confirmedClick;
            	element.bind('click',function (event) {
                if ( window.confirm(msg) ) {
                    scope.$eval(clickAction)
                }
            });
        }
    };
}]);











