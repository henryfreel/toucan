var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    salt = bcrypt.genSaltSync(10);

var Project = require('./project');

var UserSchema = new mongoose.Schema({
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },

  email: { type: String, unique: true, select: false, lowercase: true, required: true },
  password: { type: String, select: false, required: true },
  username: { type: String, unique: true, lowercase: true, required: true },

  profilePicture: { type: String, default: "default.png"},
  firstName: { type: String, default: "First"},
  lastName: { type: String, default: "Last"},
  bio: { type: String, default: "Fullstack developer working at Toucan"},
  location: { type: String, default: "San Francisco, CA"},
  jobTitle: { type: String, default: ""},
  company: { type: String, default: ""},
  stack: { type: String, default: ""},

  github: { type: String, default: ""},
  codepen: { type: String, default: ""},
  twitter: { type: String, default: ""},
  linkedin: { type: String, default: ""},

  projects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project'
      }]

});

UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

// EXPORT USER MODEL
var User = mongoose.model('User', UserSchema);
module.exports = User;

