const {model, Schema} = require('mongoose');

const userSchema = Schema({
  username: {type: String, default: null},
  email: {type: String, unique: true},
  password: {type: String},
  token: {type: String},
  imageUri: {type: String},
  chatrooms: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Chatroom',
    },
  ],
});

const User = model('User', userSchema);

module.exports = User;
