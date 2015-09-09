app.controller('markedController', ['$scope', '$http', function ($scope, $http) {

	// var marked = require('marked');

	console.log(marked('I am using __markdown__.'));

	var markdown = this;  // alias for 'this', so we can access it in $scope.$watch
	 
		this.inputText = '';
	 
		$scope.$watch('marked.inputText', function(current, original) {
	    	// markdown.outputText = marked(current);
	    	markdown.outputText = current;
		});

	// marked.setOptions({
	//     renderer: new marked.Renderer(),
	//     gfm: true,
	//     tables: true,
	//     breaks: false,
	//     pedantic: false,
	//     sanitize: false, // if false -> allow plain old HTML ;)
	//     smartLists: true,
	//     smartypants: false,
	//     highlight: function (code, lang) {
	//       if (lang) {
	//         return hljs.highlight(lang, code).value;
	//       } else {
	//         return hljs.highlightAuto(code).value;
	//       }
	//     }
	//   });

}]);

app.directive("autoGrow", function(){
      return function(scope, element, attr){
          var update = function(){
              element.css("height", "auto");
              element.css("height", element[0].scrollHeight + "px");
          };
          scope.$watch(attr.ngModel, function(){
              update();
          });
          attr.$set("ngTrim", "false");
      };
});