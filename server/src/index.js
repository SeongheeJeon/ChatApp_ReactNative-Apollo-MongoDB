import '@babel/polyfill';
import dotenv from 'dotenv';
import express from 'express';
import {SubscriptionServer} from 'subscriptions-transport-ws';
import {createServer} from 'http';
import {execute, subscribe} from 'graphql';

import './db';
import schema from './schema';
import morgan from 'morgan';
import {ApolloServer} from 'apollo-server-express';

dotenv.config();

const PORT = process.env.PORT || 4000;

const startApolloServer = async schema => {
  const app = express();
  const httpServer = createServer(app);

  app.use(morgan('dev'));

  const apollo = new ApolloServer({
    schema,
  });

  await apollo.start();

  apollo.applyMiddleware({app});

  await new Promise(resolve => httpServer.listen({port: PORT}, resolve));
  console.log(`🎻  The  Server is running on port http://localhost:${PORT}`);
};

startApolloServer(schema);
