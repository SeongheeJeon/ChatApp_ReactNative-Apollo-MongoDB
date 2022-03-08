import {gql} from 'apollo-server-express';

module.exports = gql`
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
    name: String
    description: String
    username: String
    email: String
    password: String
    token: String
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
