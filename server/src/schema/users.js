import {gql} from 'apollo-server-express';

module.exports = gql`
  type User {
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

  type Query {
    user(id: ID!): User
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
  }

  type RootQuery {
    users: [User]
  }

  schema {
    query: RootQuery
  }
`;
