import usersResolvers from './users';
import resolver from './resolver';

const resolvers = {
  Query: {
    ...usersResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
  },
  RootQuery: resolver.RootQuery,
};

module.exports = resolvers;
