var auth = require('./auth.js'),
    User = require('../models/user'),
    Project = require('../models/project');

/*
 |--------------------------------------------------------------------------
 | Projects
 |--------------------------------------------------------------------------
 */

module.exports = function(app) {
  // New Project

  app.post('/api/projects/new', auth.ensureAuthenticated, function (req, res) {

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

  // Find ProjectS

  app.get('/api/projects', function (req, res) {

    // var targetProject = req.params.id;

    Project.find(function (err, foundProjects) {

      if (foundProjects) {

        res.json(foundProjects);

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
        foundProject.summary = req.body.summary || foundProject.summary;
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

}