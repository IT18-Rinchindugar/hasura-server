/* eslint-disable import/no-extraneous-dependencies */
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import config from '@lib/config';
import express, {
  Application, Request, Response,
} from 'express';
import http from 'http';
import errorHandler, { notFound } from '@middlewares/error';
import resolvers from '@appGraphql/resolvers';
import typeDefs from '@appGraphql/typeDefs';

// Route files
import { auth } from '@routes';
import morgan from 'morgan';

const { APP_PORT, NODE_ENV } = config;

export const createApp = async () => {
  const app: Application = express();

  const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/api/v1/graphql' });

  // Without this middleware
  app.use(express.json());

  app.get('/', (req: Request, res: Response) => res.json({ message: 'OK' }));

  // Mount routers
  app.use('/api/v1/auth', auth);

  // Not Found
  app.use(notFound);

  // Error handler
  app.use(errorHandler);

  // Logging middleware
  if (NODE_ENV === 'development') {
    const logger = morgan('dev');

    httpServer.on('request', (req: Request, res: Response) => {
      logger(req, res, (err) => {
        if (err) throw Error();
      });
    });
  }

  httpServer.listen(APP_PORT, () => {
    console.log(`🚀 Server running in ${NODE_ENV} mode on port ${APP_PORT}`.green);
    console.log(`🚀 Apollo Server ready at http://localhost:${APP_PORT}${apolloServer.graphqlPath}`.yellow);
  });
};

export default createApp;
