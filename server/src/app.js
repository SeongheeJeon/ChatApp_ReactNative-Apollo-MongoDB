import express from 'express';
import {createServer} from 'http';
import {ApolloServer} from 'apollo-server-express';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';

const Schema = require('./schema/userSchema');
const Resolvers = require('./resolvers/index');

const path = '/graphql';

const app = express();
const httpServer = createServer(app);

const getPayload = token => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return {loggedIn: true, payload};
  } catch (err) {
    console.log('paylod ERROR :  ', err);
    return {loggedIn: false};
  }
};

const startApolloServer = async schema => {
  app.use(morgan('dev'));

  const apollo = new ApolloServer({
    typeDefs: schema,
    resolvers: Resolvers,
    context: ({req}) => {
      const token = req.headers.authorization;

      if (token && token !== 'undefined') {
        const {payload: user, loggedIn} = getPayload(token);
        return {user, loggedIn};
      } else {
        console.log('NO TOKEN at app.js');
        return null;
      }
    },
  });

  await apollo.start();

  apollo.applyMiddleware({app, path});
};

startApolloServer(Schema);

export default httpServer;
