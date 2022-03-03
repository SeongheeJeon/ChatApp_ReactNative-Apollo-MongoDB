import express from 'express';
import {createServer} from 'http';
import {ApolloServer} from 'apollo-server-express';
import {SubscriptionServer} from 'subscriptions-transport-ws';
import {execute, subscribe} from 'graphql';
import morgan from 'morgan';

const Schema = require('./schema/schema');
const Resolvers = require('./resolver');
const Connectors = require('./connector');

const path = '/graphql';

const app = express();
const httpServer = createServer(app);

const startApolloServer = async schema => {
  app.use(morgan('dev'));

  const apollo = new ApolloServer({
    typeDefs: schema,
    resolvers: Resolvers,
    context: Connectors,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect: async ({token}) => {
        console.log('소켓 연결!');
        if (!token) {
          console.log('토큰을 읽을 수 없습니다.');
          throw new Error('토큰을 읽을 수 없습니다.');
        }
      },
    },
    {
      server: httpServer,
      path: apollo.graphqlPath,
    },
  );
  await apollo.start();

  apollo.applyMiddleware({app, path});
};

startApolloServer(Schema);

export default httpServer;
