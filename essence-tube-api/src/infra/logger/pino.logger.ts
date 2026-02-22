import pino, { Logger as PinoLogger } from 'pino';
import { config } from '../config/index.js';

export class Logger {
  private static instance: PinoLogger = (typeof pino === 'function' ? pino : (pino as any).default)({
    level: config.app.env === 'production' ? 'info' : 'debug',
    transport:
      config.app.env !== 'production'
        ? { target: 'pino-pretty' }
        : undefined,
  });

  static getLogger(): PinoLogger {
    return Logger.instance;
  }
}
