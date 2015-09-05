
app.controller('ProjectsPageCtrl', ['$scope', '$route', function ($scope, $route) {

	$scope.projects = [
		{ 
			title: 'Belay Me', 
			liveUrl: 'http://project-canopy.herokuapp.com/',
			image: 'project-1.png',
			githubUrl: 'https://github.com/henryfreel/canopy',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi volutpat leo quam, a aliquam lacus tempus non. Curabitur vel nisl congue, tempor erat in, finibus justo. Aliquam erat volutpat. Aliquam hendrerit erat nec turpis consectetur, in suscipit elit fermentum. Suspendisse potenti. Aliquam eget scelerisque massa. Duis aliquam orci vel nibh dapibus tristique. Nunc dapibus blandit lorem vel vulputate. Duis aliquam tempor turpis a lobortis. Phasellus eget interdum urna.',
			likes: 9,
			views: 24,
			snippet: ''
		},
		{ 
			title: 'atCon', 
			liveUrl: 'http://project-canopy.herokuapp.com/',
			image: 'project-2.png',
			githubUrl: 'https://github.com/henryfreel/canopy',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi volutpat leo quam, a aliquam lacus tempus non. Curabitur vel nisl congue, tempor erat in, finibus justo. Aliquam erat volutpat. Aliquam hendrerit erat nec turpis consectetur, in suscipit elit fermentum. Suspendisse potenti. Aliquam eget scelerisque massa. Duis aliquam orci vel nibh dapibus tristique. Nunc dapibus blandit lorem vel vulputate. Duis aliquam tempor turpis a lobortis. Phasellus eget interdum urna.',
			likes: 47,
			views: 125,
			snippet: ''
		},
		{ 
			title: 'Hashit', 
			liveUrl: 'http://project-canopy.herokuapp.com/',
			image: 'project-3.png',
			githubUrl: 'https://github.com/henryfreel/canopy',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi volutpat leo quam, a aliquam lacus tempus non. Curabitur vel nisl congue, tempor erat in, finibus justo. Aliquam erat volutpat. Aliquam hendrerit erat nec turpis consectetur, in suscipit elit fermentum. Suspendisse potenti. Aliquam eget scelerisque massa. Duis aliquam orci vel nibh dapibus tristique. Nunc dapibus blandit lorem vel vulputate. Duis aliquam tempor turpis a lobortis. Phasellus eget interdum urna.',
			likes: 15,
			views: 78,
			snippet: ''
		},
		{ 
			title: 'Project Title', 
			liveUrl: 'http://project-canopy.herokuapp.com/',
			image: 'project-4.png',
			githubUrl: 'https://github.com/henryfreel/canopy',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi volutpat leo quam, a aliquam lacus tempus non. Curabitur vel nisl congue, tempor erat in, finibus justo. Aliquam erat volutpat. Aliquam hendrerit erat nec turpis consectetur, in suscipit elit fermentum. Suspendisse potenti. Aliquam eget scelerisque massa. Duis aliquam orci vel nibh dapibus tristique. Nunc dapibus blandit lorem vel vulputate. Duis aliquam tempor turpis a lobortis. Phasellus eget interdum urna.',
			likes: 38,
			views: 78,
			snippet: ''
		},
		{ 
			title: 'Acorns', 
			liveUrl: 'http://project-canopy.herokuapp.com/',
			image: 'project-5.png',
			githubUrl: 'https://github.com/henryfreel/canopy',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi volutpat leo quam, a aliquam lacus tempus non. Curabitur vel nisl congue, tempor erat in, finibus justo. Aliquam erat volutpat. Aliquam hendrerit erat nec turpis consectetur, in suscipit elit fermentum. Suspendisse potenti. Aliquam eget scelerisque massa. Duis aliquam orci vel nibh dapibus tristique. Nunc dapibus blandit lorem vel vulputate. Duis aliquam tempor turpis a lobortis. Phasellus eget interdum urna.',
			likes: 124,
			views: 672,
			snippet: ''
		},
		{ 
			title: 'atCon', 
			liveUrl: 'http://project-canopy.herokuapp.com/',
			image: 'project-6.png',
			githubUrl: 'https://github.com/henryfreel/canopy',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi volutpat leo quam, a aliquam lacus tempus non. Curabitur vel nisl congue, tempor erat in, finibus justo. Aliquam erat volutpat. Aliquam hendrerit erat nec turpis consectetur, in suscipit elit fermentum. Suspendisse potenti. Aliquam eget scelerisque massa. Duis aliquam orci vel nibh dapibus tristique. Nunc dapibus blandit lorem vel vulputate. Duis aliquam tempor turpis a lobortis. Phasellus eget interdum urna.',
			likes: 57,
			views: 238,
			snippet: ''
		},
		{ 
			title: 'Hashit', 
			liveUrl: 'http://project-canopy.herokuapp.com/',
			image: 'project-7.png',
			githubUrl: 'https://github.com/henryfreel/canopy',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi volutpat leo quam, a aliquam lacus tempus non. Curabitur vel nisl congue, tempor erat in, finibus justo. Aliquam erat volutpat. Aliquam hendrerit erat nec turpis consectetur, in suscipit elit fermentum. Suspendisse potenti. Aliquam eget scelerisque massa. Duis aliquam orci vel nibh dapibus tristique. Nunc dapibus blandit lorem vel vulputate. Duis aliquam tempor turpis a lobortis. Phasellus eget interdum urna.',
			likes: 28,
			views: 119,
			snippet: ''
		},
		{ 
			title: 'Project Title', 
			liveUrl: 'http://project-canopy.herokuapp.com/',
			image: 'project-8.png',
			githubUrl: 'https://github.com/henryfreel/canopy',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi volutpat leo quam, a aliquam lacus tempus non. Curabitur vel nisl congue, tempor erat in, finibus justo. Aliquam erat volutpat. Aliquam hendrerit erat nec turpis consectetur, in suscipit elit fermentum. Suspendisse potenti. Aliquam eget scelerisque massa. Duis aliquam orci vel nibh dapibus tristique. Nunc dapibus blandit lorem vel vulputate. Duis aliquam tempor turpis a lobortis. Phasellus eget interdum urna.',
			likes: 17,
			views: 80,
			snippet: ''
		},
		{ 
			title: 'Hashit', 
			liveUrl: 'http://project-canopy.herokuapp.com/',
			image: 'project-9.png',
			githubUrl: 'https://github.com/henryfreel/canopy',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi volutpat leo quam, a aliquam lacus tempus non. Curabitur vel nisl congue, tempor erat in, finibus justo. Aliquam erat volutpat. Aliquam hendrerit erat nec turpis consectetur, in suscipit elit fermentum. Suspendisse potenti. Aliquam eget scelerisque massa. Duis aliquam orci vel nibh dapibus tristique. Nunc dapibus blandit lorem vel vulputate. Duis aliquam tempor turpis a lobortis. Phasellus eget interdum urna.',
			likes: 2,
			views: 9,
			snippet: ''
		},
		{ 
			title: 'Hashit', 
			liveUrl: 'http://project-canopy.herokuapp.com/',
			image: 'project-10.png',
			githubUrl: 'https://github.com/henryfreel/canopy',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi volutpat leo quam, a aliquam lacus tempus non. Curabitur vel nisl congue, tempor erat in, finibus justo. Aliquam erat volutpat. Aliquam hendrerit erat nec turpis consectetur, in suscipit elit fermentum. Suspendisse potenti. Aliquam eget scelerisque massa. Duis aliquam orci vel nibh dapibus tristique. Nunc dapibus blandit lorem vel vulputate. Duis aliquam tempor turpis a lobortis. Phasellus eget interdum urna.',
			likes: 1,
			views: 5,
			snippet: ''
		},
		{ 
			title: 'Hashit', 
			liveUrl: 'http://project-canopy.herokuapp.com/',
			image: 'project-11.png',
			githubUrl: 'https://github.com/henryfreel/canopy',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi volutpat leo quam, a aliquam lacus tempus non. Curabitur vel nisl congue, tempor erat in, finibus justo. Aliquam erat volutpat. Aliquam hendrerit erat nec turpis consectetur, in suscipit elit fermentum. Suspendisse potenti. Aliquam eget scelerisque massa. Duis aliquam orci vel nibh dapibus tristique. Nunc dapibus blandit lorem vel vulputate. Duis aliquam tempor turpis a lobortis. Phasellus eget interdum urna.',
			likes: 24,
			views: 19,
			snippet: ''
		},
		{ 
			title: 'Hashit', 
			liveUrl: 'http://project-canopy.herokuapp.com/',
			image: 'project-12.png',
			githubUrl: 'https://github.com/henryfreel/canopy',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi volutpat leo quam, a aliquam lacus tempus non. Curabitur vel nisl congue, tempor erat in, finibus justo. Aliquam erat volutpat. Aliquam hendrerit erat nec turpis consectetur, in suscipit elit fermentum. Suspendisse potenti. Aliquam eget scelerisque massa. Duis aliquam orci vel nibh dapibus tristique. Nunc dapibus blandit lorem vel vulputate. Duis aliquam tempor turpis a lobortis. Phasellus eget interdum urna.',
			likes: 45,
			views: 143,
			snippet: ''
		},
	]

}]);