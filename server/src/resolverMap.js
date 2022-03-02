const resolverMap = {
  Query: {
    hello: () => 'Hello Hee!',
  },
  Subscription: {
    greetings: async function* sayHiIn5Languages() {
      for (const hi of ['Hi', 'Bonjour', 'Hola', 'Ciao', 'Zdravo']) {
        yield {greetings: hi};
      }
    },
  },
};
export default resolverMap;
