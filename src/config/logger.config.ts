import path from 'path';
import { LoggerOptions } from 'winston';
import * as winston from "winston";
import DailyRotateFile from 'winston-daily-rotate-file';

const isProduction = process.env.NODE_ENV === "production";
// const isProduction = true;
const redactedKeys = ["password"];


const consoleTransport = new winston.transports.Console({
  level: 'debug',
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss Z' }), // Add a timestamp to file logs
    winston.format.simple(),
  ),
});

let fileTransport: DailyRotateFile;
if (isProduction) {
  fileTransport = new DailyRotateFile({
    level: 'error',
    dirname: path.join(process.cwd(), 'logs'),
    filename: '%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
    format: winston.format.combine(
      winston.format.printf((info): string =>
        JSON.stringify(info, (key: string, value: any): any => redactedKeys.includes(key) ? "[REDACTED]" : value)),
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss Z' }), // Add a timestamp to file logs
      winston.format.uncolorize(),
      winston.format.prettyPrint(),
      winston.format.splat(),
      winston.format.json(),
    ),
  });
}

export const loggerOptions: LoggerOptions = {
  transports: [
    isProduction ? fileTransport! : consoleTransport,
  ],
}

