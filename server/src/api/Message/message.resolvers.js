import Chatroom from '../../models/ChatroomModel';
import Message from '../../models/MessageModel';

export default {
  Query: {
    async messages() {
      const messages = await Message.find();
      return messages;
    },
    async chatroomMessages(_, {chatroomId}) {
      const chatroom = await Chatroom.findById(chatroomId);
      const messages = await Promise.all(
        chatroom.messages.map(
          async messageId => await Message.findById(messageId).exec(),
        ),
      );
      return messages;
    },
  },
  Mutation: {
    async sendMessage(_, {chatroomId, content}, {authUser}) {
      const chatroom = await Chatroom.findById(chatroomId);
      const users = chatroom.users;

      // set message to each user
      users.map(async userId => {
        const newMessage = await new Message({
          content,
          userID: authUser.id,
          forUserID: userId,
        });

        await chatroom.messages.push(newMessage);
        await newMessage.save();

        if (userId === authUser.id) {
          // set lastMessage to chatroom
        }
      });
      await chatroom.save();
    },
  },
};
