import Chatroom from '../../models/ChatroomModel';

export default {
  Query: {
    async chatrooms() {
      const chatrooms = await Chatroom.find();
      return chatrooms;
    },
  },
};
