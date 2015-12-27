var auth = require('./auth.js'),
    jwt = require('jwt-simple'),
    User = require('../models/user'),
    Project = require('../models/project');

/*
 |--------------------------------------------------------------------------
 | Users
 |--------------------------------------------------------------------------
 */

module.exports = function(app) {

  // Find [Current] User

  app.get('/api/me', auth.ensureAuthenticated, function(req, res) {
    User.findById(req.user, function(err, user) {
      res.send(user);
    });
  });

  // Edit User

  app.put('/api/me', auth.ensureAuthenticated, function(req, res) {

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
        res.send({ token: auth.createJWT(user) });
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
       res.send({ token: auth.createJWT(user) });
     });
   });
  });

}
