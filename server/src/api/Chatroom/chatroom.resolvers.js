import Chatroom from '../../models/ChatroomModel';
import User from '../../models/UserModel';

export default {
  Query: {
    async chatroom(_, {id}) {
      const chatroom = await Chatroom.findById(id);
      return chatroom;
    },
    async chatrooms() {
      const chatrooms = await Chatroom.find();
      return chatrooms;
    },
    async myChatrooms(_, __, {authUser}) {
      const authUserDB = await User.findById(authUser.id).exec();
      const chatrooms = await Promise.all(
        authUserDB.chatrooms.map(async chatroomId => {
          const chatroom = await Chatroom.findById(chatroomId).exec();
          return chatroom;
        }),
      );
      return chatrooms;
    },
    async chatroomUsers(_, {chatroomId}) {
      const chatroom = await Chatroom.findById(chatroomId);
      const users = await Promise.all(
        chatroom.users.map(async id => await User.findById(id).exec()),
      );
      return users;
    },
  },
  Mutation: {
    async createChatroom(_, {usersId}) {
      const newChatroom = await new Chatroom();

      const users = await Promise.all(
        usersId.map(async id => {
          const user = await User.findById(id).exec();
          await user.chatrooms.push(newChatroom);
          await user.save();
          return user;
        }),
      );
      newChatroom.users = users;

      const res = await newChatroom.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
  },
};
