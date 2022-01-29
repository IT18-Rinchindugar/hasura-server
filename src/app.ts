/* eslint-disable import/no-extraneous-dependencies */
import express, {
  Request, Response, Application,
} from 'express';
import errorHandler, { notFound } from '@middlewares/error';

// Route files
import auth from '@routes/auth';

export const createApp = () => {
  const app: Application = express();
  // Without this middleware
  app.use(express.json());

  app.get('/', (req: Request, res: Response) => res.json({ message: 'OK' }));
  // Mount routers
  app.use('/api/v1/auth', auth);

  // Not Found
  app.use(notFound);

  // Error handler
  app.use(errorHandler);

  return app;
};

export default createApp;
