const {model, Schema} = require('mongoose');

const messageSchema = Schema({
  content: {type: String},
  audio: {type: String},
  image: {type: String},
  status: {type: String, enum: ['SENT', 'DELIVERED', 'READ']},
  chatroomID: {
    type: Schema.Types.ObjectId,
    ref: 'Chatroom',
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {type: Date, default: Date.now},
});

const Message = model('User', messageSchema);

module.exports = Message;
