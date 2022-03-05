import usersResolvers from './userResolvers';

const resolvers = {
  Query: {
    ...usersResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
  },
};

module.exports = resolvers;
