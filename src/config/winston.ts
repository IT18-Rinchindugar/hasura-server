import winston from 'winston';
import { WinstonOptions } from '@appTypes/winston';

import config from '@lib/config';

const { format } = winston;
const {
  combine, timestamp, label, prettyPrint, printf, splat,
} = format;
const { LOG_PATH } = config;

const options: WinstonOptions = {
  file: {
    level: 'info',
    filename: `${LOG_PATH}/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const appFormat = printf(({
  level, message, label: pLabel, timestamp: pTimestamp,
}) => `${pTimestamp} [${pLabel}] ${level}: ${message}`);

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  format: combine(
    label({ label: 'Server API' }),
    timestamp(),
    prettyPrint(),
    splat(),
    appFormat,
  ),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write(message: any, encoding: any) {
    // use the 'info' log level so the output will be picked up by both
    // transports (file and console)
    logger.info(message);
  },
};

export default logger;
