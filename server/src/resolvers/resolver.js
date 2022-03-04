import User from '../models/User';

const resolveFunctions = {
  RootQuery: {
    async users() {
      const users = await User.find();
      return users;
    },
  },
};

module.exports = resolveFunctions;
