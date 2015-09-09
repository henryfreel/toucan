var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    salt = bcrypt.genSaltSync(10);

var User = require('./user');

var ProjectSchema = new mongoose.Schema({
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },

  title: { type: String, required: true },
  liveUrl: { type: String, lowercase: true},
  image: { type: String, default: "default-project.jpg"},

  githubUrl: { type: String, default: ""},
  description: { type: String, default: "", required: true },
  snippet: { type: String, default: ""},

  likes: { type: Number, default: 0},
  views: { type: Number, default: 0},

  user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }

});

// EXPORT USER MODEL
var Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;