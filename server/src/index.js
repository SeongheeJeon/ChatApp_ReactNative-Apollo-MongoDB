import '@babel/polyfill';
import dotenv from 'dotenv';
import './db';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await new Promise(resolve => app.listen({port: PORT}, resolve));
  console.log(`🎈 The Server is running on http://localhost:${PORT}`);
};

startServer();
