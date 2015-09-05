var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    salt = bcrypt.genSaltSync(10);

var ProjectSchema = new mongoose.Schema({
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },

  title: { type: String, , required: true },
  liveUrl: { type: String, unique: true, lowercase: true, required: true },
  image: { type: String, default: ""},

  githubUrl: { type: String, default: ""},
  description: { type: String, default: ""},
  snippet: { type: String, default: ""},

  likes: { type: Number, default: 0},
  views: { type: Number, default: 0}

});

// EXPORT USER MODEL
var Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;