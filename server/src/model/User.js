const Mongoose = require('mongoose');

const UserSchema = Mongoose.Schema({
  name: String,
  description: String,
});

const User = Mongoose.model('user', UserSchema);

module.exports = User;
