const {model, Schema} = require('mongoose');

const chatroomSchema = Schema({
  name: {type: String},
  imageUri: {type: String},
  newMessages: {type: Number},
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
  lastMessage: {
    type: Schema.Types.ObjectId,
    ref: 'Message',
  },
  createdAt: {type: String},
  updatedAt: {type: String},
});

const Chatroom = model('Chatroom', chatroomSchema);

module.exports = Chatroom;
