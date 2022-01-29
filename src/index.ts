/* eslint-disable import/no-extraneous-dependencies */
import 'module-alias/register';
import * as dotenv from 'dotenv';
import colors from 'colors';
import Config from '@lib/config';
import morgan from 'morgan';
import winston from '@config/winston';
import { createApp } from './app';

const { APP_PORT, NODE_ENV } = Config;
// Colors
colors.enable();

// Dotenv
dotenv.config();

const server = createApp();

// Logging middleware
if (NODE_ENV === 'development') {
  server.use(morgan('dev'));
}

if (NODE_ENV === 'production') {
  server.use(morgan('combined', { stream: winston.stream }));
}

server.listen(APP_PORT, () => console.log(
  `Server running in ${NODE_ENV} mode on port ${APP_PORT}`.green,
));
