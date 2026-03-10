import { Logger } from "@logos/utils";
import { config } from "./environment.js";

export class PinoLogger {
  private static instance = Logger.getLogger(config.logger, "auth-api");

  static getLogger() {
    return PinoLogger.instance;
  }
}
