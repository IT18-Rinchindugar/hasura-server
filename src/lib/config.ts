import * as dotenv from 'dotenv';
import { ProcessEnv } from '../types/constants';

dotenv.config();

const {
  NODE_ENV = 'development',
  APP_PORT = 3000,
  GOOGLE_FIREBASE_CONFIG = 'firebase-config.json',
  EMAIL_PROVIDER = '',
  LOG_PATH = '',
  GOOGLE_FIREBASE_WEB_API_KEY = '',
} = process.env;

const config: ProcessEnv = {
  NODE_ENV,
  APP_PORT,
  GOOGLE_FIREBASE_CONFIG,
  EMAIL_PROVIDER,
  LOG_PATH,
  GOOGLE_FIREBASE_WEB_API_KEY,
};

export default config;
