import {gql} from 'apollo-server-express';

export default gql`
  type Chatroom {
    id: ID!
    name: String
    imageUri: String
    newMessages: Int
    users: [User]
    messages: [Message]
    lastMessage: Message
    createdAt: String
    updatedAt: String
  }

  type Query {
    chatroom(id: String): Chatroom
    chatrooms: [Chatroom]
    myChatrooms: [Chatroom]
    chatroomUsers(chatroomId: String): [User]
  }

  type Mutation {
    createChatroom(usersId: [String]): Chatroom
  }
`;
