import pino, { type LoggerOptions } from 'pino';
import { env } from '@/config/env.js';

const getLogLevel = () => {
  if (env.environment === 'test') {
    return 'silent';
  }
  if (env.environment === 'production') {
    return 'info';
  }
  return 'debug';
};

const options: LoggerOptions = {
  level: getLogLevel(),
  redact: ['req.headers.authorization', 'req.headers.cookie', '*.password'],
};

if (env.environment === 'development') {
  options.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  };
}

export const logger = pino(options);
