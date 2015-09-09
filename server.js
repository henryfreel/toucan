// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),  // for data from the request body
    mongoose = require('mongoose');       // to interact with our db

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
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/toucan'
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
 | GET /api/me
 |--------------------------------------------------------------------------
 */
app.get('/api/me', ensureAuthenticated, function(req, res) {
  User.findById(req.user, function(err, user) {
    res.send(user);
  });
});

/*
 |--------------------------------------------------------------------------
 | PUT /api/me
 |--------------------------------------------------------------------------
 */
app.put('/api/me', ensureAuthenticated, function(req, res) {
  User.findById(req.user, function(err, user) {
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.save(function(err) {
      res.status(200).end();
    });
  });
});

/*
 |--------------------------------------------------------------------------
 | Log in with Email
 |--------------------------------------------------------------------------
 */
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

/*
 |--------------------------------------------------------------------------
 | Create Email and Password Account
 |--------------------------------------------------------------------------
 */
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
 | Find Specific User for profile
 |--------------------------------------------------------------------------
 */
app.get('/api/users/:username', function (req, res) {

  var targetUser = req.params.username;

  User.findOne({username: targetUser}, function (err, foundUser) {

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
 | Create New Project
 |--------------------------------------------------------------------------
 */
app.post('/api/projects/new', function (req, res) {

  var newProject = new Project(req.body)

  newProject.save( function (err, savedProject) {

    // res.json(savedProject);

    var userId = savedProject.user

    console.log("--> This is the Id of the user who created the newProject");
    console.log(userId);

    User.findOne({_id: userId}).exec(function (err, foundUser) {

      

    });

  })

  // User.findOne({_id: req.session.userId}).exec(function (err, foundUser) {

  //     console.log('--> this is the current user');
  //     console.log(foundUser.email);

  //     var newList = new List(req.body);

  //     newList.author = foundUser;

  //     newList.save(function (err, savedList) {

  //       console.log('--> list array before push');
  //       console.log(foundUser.lists);

  //       // add newList to `lists` array
  //       foundUser.lists.push(savedList);

  //       foundUser.save(function (err, savedUser) {
  //         // send newList as JSON response
  //         res.json(savedList);
  //       });

  //       console.log('--> list array after push');
  //       console.log(foundUser.lists);

  //     });

  // }); 

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
app.listen(process.env.PORT || 3000, function () {
  console.log('server started on localhost:3000');
});
























