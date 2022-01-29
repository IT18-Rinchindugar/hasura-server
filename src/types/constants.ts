export type MailTransportType = 'MAILDEV';

export type MailTransportTypes = {
  [key in MailTransportType]: string;
};

export type ProcessEnvTypes =
  'NODE_ENV'|
  'APP_PORT'|
  'GOOGLE_FIREBASE_CONFIG';

export type ProcessEnv = {
  [key in ProcessEnvTypes]: string | number;
};
