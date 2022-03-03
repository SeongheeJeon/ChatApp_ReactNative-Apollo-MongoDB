const resolveFunctions = {
  RootQuery: {
    user(obj, {name}, context, info) {
      const user = new context.User();
      return user.findUser(name);
    },
  },
};

module.exports = resolveFunctions;
