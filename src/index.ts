/* eslint-disable import/no-extraneous-dependencies */
import 'module-alias/register';
import * as dotenv from 'dotenv';
import express, { Request, Response, Application } from 'express';
import morgan from 'morgan';
import erroHandler from '@middlewares/error';

// Route files
import auth from '@routes/auth';
import Config from '@lib/config';

const { APP_PORT, NODE_ENV } = Config;

// Dotenv
dotenv.config();
const app: Application = express();

// Dev logging middleware
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Without this middleware
app.use(express.json());

app.get('/', (req: Request, res: Response) => res.json({ message: 'OK' }));

// Mount routers
app.use('/api/v1/auth', auth);

// Error handler
app.use(erroHandler);

app.listen(APP_PORT, () => console.log(
  `Server running in ${NODE_ENV} mode on port ${APP_PORT}`,
));
