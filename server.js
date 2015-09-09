// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),  // for data from the request body
    mongoose = require('mongoose');       // to interact with our db

require('dotenv').load();

var path = require('path');
var cors = require('cors');
var jwt = require('jwt-simple');
var moment = require('moment');

var config = require('./config.js');

var User = require('./models/user');
var Project = require('./models/project');

// connect to mongodb
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL
);

// configure body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// set location for static files
app.use(express.static(__dirname + '/client'));


/*
 |--------------------------------------------------------------------------
 | Login Required Middleware
 |--------------------------------------------------------------------------
 */
function ensureAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.headers.authorization.split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, config.TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  next();
}


/*
 |--------------------------------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------------------------------
 */
function createJWT(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}


/*
 |--------------------------------------------------------------------------
 | Authentication
 |--------------------------------------------------------------------------
 */

// Login

app.post('/auth/login', function(req, res) {
  User.findOne({ email: req.body.email }, '+password', function(err, user) {
    if (!user) {
      return res.status(401).send({ message: 'Wrong email and/or password' });
    }
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ message: 'Wrong email and/or password' });
      }
      res.send({ token: createJWT(user) });
    });
  });
});

// Signup

app.post('/auth/signup', function(req, res) {
 User.findOne({ email: req.body.email }, function(err, existingUser) {
   if (existingUser) {
     return res.status(409).send({ message: 'Email is already taken' });
   }
   var user = new User({
     username: req.body.username,
     email: req.body.email,
     password: req.body.password
   });
   user.save(function() {
     res.send({ token: createJWT(user) });
   });
 });
});


/*
 |--------------------------------------------------------------------------
 | Users
 |--------------------------------------------------------------------------
 */

// Find [Current] User

app.get('/api/me', ensureAuthenticated, function(req, res) {
  User.findById(req.user, function(err, user) {
    res.send(user);
  });
});

// Edit User

app.put('/api/me', ensureAuthenticated, function(req, res) {

  User.findById(req.user, function(err, foundUser) {
    if (!foundUser) {
      return res.status(400).send({ message: 'User not found' });
    }

    foundUser.username = req.body.username || foundUser.username;

    foundUser.firstName = req.body.firstName || foundUser.firstName;
    foundUser.lastName = req.body.lastName || foundUser.lastName;
    foundUser.profilePicture = req.body.profilePicture || foundUser.profilePicture;
    foundUser.bio = req.body.bio || foundUser.bio;
    foundUser.location = req.body.location || foundUser.location;
    foundUser.jobTitle = req.body.jobTitle || foundUser.jobTitle;
    foundUser.company = req.body.company || foundUser.company;
    foundUser.stack = req.body.stack || foundUser.stack;

    foundUser.github = req.body.github || foundUser.github;
    foundUser.twitter = req.body.twitter || foundUser.twitter;
    foundUser.codepen = req.body.codepen || foundUser.codepen;
    foundUser.linkedin = req.body.linkedin || foundUser.linkedin;

    foundUser.save(function(err) {
      res.status(200).end();
    });

  });
});

// Find User

app.get('/api/users/:id', function (req, res) {

  var targetUser = req.params.id;

  User.findOne({username: targetUser}).populate('projects').exec(function (err, foundUser) {

    if (foundUser) {
      res.json(foundUser);
    } else {
      res.status(404).send('Sorry cant find that!');
      // res.redirect('/views/404.html')
    }

  });

});


/*
 |--------------------------------------------------------------------------
 | Projects
 |--------------------------------------------------------------------------
 */

// New Project

app.post('/api/projects/new', ensureAuthenticated, function (req, res) {

  var newProject = new Project(req.body)

  newProject.save( function (err, savedProject) {

    if (savedProject) {

      var userId = savedProject.user

      User.findOne({_id: userId}).exec(function (err, foundUser) {

        foundUser.projects.push(savedProject);

        foundUser.save(function (err, savedUser) {

          if (savedUser) {

            res.json(savedProject);

          } else {
            res.status(500).send('Couldn\'t save user');
            // res.redirect('/views/404.html')
          }

        });

      });

    } else {
      res.status(500).send('Couldn\'t save project');
      // res.redirect('/views/404.html')
    }

  });

});

// Find Project

app.get('/api/projects/:id', function (req, res) {

  var targetProject = req.params.id;

  Project.findOne({_id: targetProject}).populate('user').exec(function (err, foundProject) {

    if (foundProject) {

      res.json(foundProject);

    } else {
      res.status(404).send('Sorry cant find that!');
      // res.redirect('/views/404.html')
    }

  });

});

// Update Project

app.put('/api/projects/:id/edit', function (req, res) {

  var targetProject = req.params.id;

  Project.findOne({_id: targetProject}, function (err, foundProject) {

    if (foundProject) {

      foundProject.title = req.body.title || foundProject.title;
      foundProject.liveUrl = req.body.liveUrl || foundProject.liveUrl;
      foundProject.content = req.body.content || foundProject.content;
      // res.json(foundProject);

      foundProject.save(function(err) {
        res.status(200).end();
      });

    } else {
      res.status(404).send('Sorry cant find that!');
      // res.redirect('/views/404.html')
    }

  });

});

// Delete Project

app.delete('/api/projects/:id', function (req, res) {

  var targetProject = req.params.id;

  Project.findOneAndRemove({_id: targetProject}, function (err, foundProject) {

    if (foundProject) {

      res.json(foundProject);

    } else {
      res.status(404).send('Sorry cant find that!');
      // res.redirect('/views/404.html')
    }

  });

});







/*
 |--------------------------------------------------------------------------
 | Nothing below here!
 |--------------------------------------------------------------------------
 */

// load public/index.html file (angular app)
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/client/views/index.html');
});

// listen on port 3000
app.listen(process.env.PORT, function () {
  console.log('server started on localhost:3000');
});
























