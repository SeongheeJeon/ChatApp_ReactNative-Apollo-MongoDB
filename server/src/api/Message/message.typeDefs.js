import {gql} from 'apollo-server-express';

export default gql`
  type Query {
    messages: [Message]
  }

  type Message {
    id: ID!
    content: String
    audio: String
    image: String
    status: MessageStatus
    chatroomID: ID!
    userID: ID!
    createdAt: String
  }

  enum MessageStatus {
    SENT
    DELIVERED
    READ
  }
`;
