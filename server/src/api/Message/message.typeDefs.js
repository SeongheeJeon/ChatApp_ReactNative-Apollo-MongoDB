import {gql} from 'apollo-server-express';

export default gql`
  type Message {
    id: ID!
    content: String
    audio: String
    image: String
    status: MessageStatus
    chatroomID: ID!
    userID: ID!
    forUserID: ID!
    createdAt: String
  }

  type Query {
    messages: [Message]
    chatroomMessages(chatroomId: String): [Message]
  }

  type Mutation {
    sendMessage(chatroomId: String, content: String): Message
  }

  enum MessageStatus {
    SENT
    DELIVERED
    READ
  }
`;
