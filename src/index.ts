/* eslint-disable import/no-extraneous-dependencies */
import 'module-alias/register';
import * as dotenv from 'dotenv';
import express, {
  Request, Response, Application,
} from 'express';
import morgan from 'morgan';
import colors from 'colors';
import errorHandler, { notFound } from '@middlewares/error';
import winston from '@config/winston';

// Route files
import auth from '@routes/auth';
import Config from '@lib/config';

const { APP_PORT, NODE_ENV } = Config;
// Colors
colors.enable();

// Dotenv
dotenv.config();
const app: Application = express();

// Logging middleware
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

if (NODE_ENV === 'production') {
  app.use(morgan('combined', { stream: winston.stream }));
}

// Without this middleware
app.use(express.json());

app.get('/', (req: Request, res: Response) => res.json({ message: 'OK' }));

// Mount routers
app.use('/api/v1/auth', auth);

// Not Found
app.use(notFound);

// Error handler
app.use(errorHandler);

app.listen(APP_PORT, () => console.log(
  `Server running in ${NODE_ENV} mode on port ${APP_PORT}`.green,
));
