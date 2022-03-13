import Chatroom from '../../models/ChatroomModel';
import User from '../../models/UserModel';

export default {
  Query: {
    async chatrooms() {
      const chatrooms = await Chatroom.find();
      return chatrooms;
    },
  },
  Mutation: {
    async createChatroom(_, {usersId}) {
      const users = await Promise.all(
        usersId.map(async id => await User.findById(id).exec()),
      );

      const newChatroom = await new Chatroom({
        users: users,
      });

      const res = await newChatroom.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
  },
};
