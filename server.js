// require express and other modules
var express = require('express'),
    app = express(),
    resources = require('./resources'),
    bodyParser = require('body-parser'),  // for data from the request body
    mongoose = require('mongoose');       // to interact with our db

require('dotenv').load();

var path = require('path');
var cors = require('cors');
var jwt = require('jwt-simple');
var moment = require('moment');

// connect to mongodb
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL
);

// SET VIEW ENGINE
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view options', {
  layout: false
});

// configure body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// set location for static files
app.use(express.static(__dirname + '/client'));

app.get('/', resources.index);
app.get('/templates/:name', resources.templates);

require('./resources/users')(app);
require('./resources/projects')(app);

app.get('/*', resources.index);

// listen on port 3000
app.listen(process.env.PORT, function () {
  console.log('server started on localhost:' + process.env.PORT);
});
