app.controller('ProfilePageCtrl', ['$scope', '$http','$routeParams',function ($scope, $http,$routeParams) {

  // $scope.getProfile = function() {
  //   Account.getProfile()
  //     .then(function(response) {
  //       $scope.user = response.data;
  //     })
  //     .catch(function(response) {
  //       // toastr.error(response.data.message, response.status);
  //     });
  // };

  var userName = $routeParams.id
  console.log("--> this is the username from controller")
  console.log(userName);

	$http.get('/api/users/' + userName)
  		.then(function(response) {
  
	  		$scope.user = response.data;
	  		console.log("--> this is the response for a user's profile");
	  		console.log(response);

  		}, function(response) {
  	});

  // $scope.user = { 
	 //  	"_id" : "55eb9e2b4b9a1dfd0d307cab", 
	 //  	"username" : "henryfreel", 
	 //  	"email" : "henryfreel@gmail.com", 
	 //  	"password" : "$2a$10$YnAptWyL5f2h0x23Ite8ZeIDqZGzgo4N6EkfAkfpw3ybJKkYreoGq", 
	 //  	"linkedin" : "https://www.linkedin.com/in/henryfreel", 
	 //  	"twitter" : "@henryfreel", 
	 //  	"codepen" : "", 
	 //  	"github" : "https://github.com/henryfreel", 
	 //  	"stack" : "",  
	 //  	"company" : "", 
	 //  	"jobTitle" : "Product Designer & Developer", 
	 //  	"location" : "San Francisco, CA", 
	 //  	"bio" : "Product Designer & Developer living in San Francisco.", 
	 //  	"lastName" : "Freel", 
	 //  	"firstName" : "Henry", 
	 //  	"profilePicture" : "henry.png", 
	 //  	"updated_at" : "2015-09-06T02:00:11.265Z", 
	 //  	"created_at" : "2015-09-06T02:00:11.265Z", 
	 //  	"__v" : 0 }
  // 	;

}]);