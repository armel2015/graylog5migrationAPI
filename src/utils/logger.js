import { requestContext } from '@fastify/request-context';
import winston from 'winston';
import WinstonGraylog2 from 'winston-graylog2';
import config from '../config.js';

const { format } = winston;

const graylogHostname = config.log.hostname;
const graylogPort = config.log.port;
if (graylogHostname === undefined || graylogPort === undefined) {
  // throw new Error(`Graylog ${graylogHostname === undefined ? 'port' : 'hostname'} is not configured.`);
}

const options = {
  name: 'graylog',
  level: 'info',
  handleExceptions: false,
  graylog: {
    servers: [
      {
        host: graylogHostname,
        port: parseInt(graylogPort)
      }
    ],
    facility: config.app.identifier,
    bufferSize: 1380
  },
  staticMeta: {
    app_name: config.app.identifier,
    app_version: config.app.version,
    env: config.env
  },
  format: format.combine(
    format.errors({ stack: true }),
    format.metadata()
  )
};

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      customFormat
    )
  }),
  new WinstonGraylog2(options)
];

export const winstonLogger = winston.createLogger({
  level: 'info',
  exitOnError: false,
  // @ts-expect-error WinstonGraylog2 doesn't seem to be compatible with TypeScript yet.
  transports
});

function getHttpContext () {
  return {
    request_id: requestContext.get('requestId'),
    request_method: requestContext.get('requestMethod'),
    request_path: requestContext.get('requestPath'),
    trace_id: requestContext.get('traceId'),
    user_id: requestContext.get('userId')
  };
}

const logger = {
  log: function (level, message) {
    winstonLogger.log(level, message, getHttpContext());
  },
  error: function (message) {
    winstonLogger.error(message, getHttpContext());
  },
  warn: function (message) {
    winstonLogger.warn(message, getHttpContext());
  },
  verbose: function (message) {
    winstonLogger.verbose(message, getHttpContext());
  },
  info: function (message) {
    winstonLogger.info(message, getHttpContext());
  },
  debug: function (message) {
    winstonLogger.debug(message, getHttpContext());
  },
  silly: function (message) {
    winstonLogger.silly(message, getHttpContext());
  }
};

export default logger;
