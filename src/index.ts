/* eslint-disable import/no-extraneous-dependencies */
import 'module-alias/register';
import * as dotenv from 'dotenv';
import colors from 'colors';
import { createApp } from './app';

// Colors
colors.enable();

// Dotenv
dotenv.config();

// Create app
createApp();
