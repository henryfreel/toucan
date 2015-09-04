var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    salt = bcrypt.genSaltSync(10);

var UserSchema = new mongoose.Schema({
  created_at: { type: Date },
  updated_at: { type: Date },
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  displayName: String,
  picture: String,
  github: String,
  twitter: String,
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
  console.log(password)
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

// EXPORT USER MODEL
var User = mongoose.model('User', UserSchema);
module.exports = User;

