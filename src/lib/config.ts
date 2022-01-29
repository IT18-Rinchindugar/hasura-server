import * as dotenv from 'dotenv';
import { ProcessEnv } from '../types/constants';

dotenv.config();

const {
  NODE_ENV = 'development',
  APP_PORT = 3000,
  GOOGLE_FIREBASE_CONFIG = 'firebase-config.json',
} = process.env;

const config: ProcessEnv = {
  NODE_ENV,
  APP_PORT,
  GOOGLE_FIREBASE_CONFIG,
};

export default config;
