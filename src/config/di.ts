/* eslint-disable import/no-dynamic-require */
import diContainer from '@lib/diContainer';
import Config from '@lib/config';

const {
  EMAIL_PROVIDER,
} = Config;

const emailProvider = require(`@lib/${EMAIL_PROVIDER}.ts`).default;

diContainer.register('emailProvider', () => emailProvider);

export default diContainer;
