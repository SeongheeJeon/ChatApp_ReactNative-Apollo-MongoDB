import {gql} from 'apollo-server-express';

export default gql`
  type Query {
    users: [User]
    user(id: ID!): User
    getAuthUser: User
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
  }

  type User {
    id: ID!
    username: String!
    email: String!
    imageUri: String
    token: String
    chatrooms: [Chatroom]
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }
`;
