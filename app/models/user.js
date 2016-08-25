var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var User;
var userSchema;

var userSchema = new Schema({
  username: { type: String, index: { unique: true }},
  password: String
});

var User = mongoose.model('User', userSchema);

User.prototype.comparePassword = function (attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    if (err) {
      callback(err);
    } else {
      callback(null, isMatch);
    }
  });
};

User.pre('save', function() {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
    });
});

module.exports = User;