import { Logger as LogosLogger } from "@logos/logger";
import type { Logger as PinoLoggerType } from "pino";
import { config } from "./environment.js";

export class PinoLogger {
  private static instance = LogosLogger.getLogger(config.logger, "auth-api");

  static getLogger(): PinoLoggerType {
    return PinoLogger.instance;
  }
}
