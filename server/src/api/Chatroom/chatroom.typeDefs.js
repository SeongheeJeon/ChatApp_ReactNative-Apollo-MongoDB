import {gql} from 'apollo-server-express';

export default gql`
  type Chatroom {
    id: ID!
    name: String
    imageUri: String
    newMessage: Int
    users: [User]
    messages: [Message]
    lastMessage: Message
    createdAt: String
    updatedAt: String
  }

  type Query {
    chatrooms: [Chatroom]
  }

  type Mutation {
    createChatroom(usersId: [String]): Chatroom
  }
`;
