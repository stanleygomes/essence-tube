import pino, { Logger as PinoLogger } from "pino";
import type { LoggerConfig } from "./types/logger.js";

export class Logger {
  private static instances = new Map<string, PinoLogger>();

  static getLogger(
    config: LoggerConfig = { level: "info", transport: "pino-pretty" },
    instanceKey = "default",
  ): PinoLogger {
    if (!Logger.instances.has(instanceKey)) {
      Logger.instances.set(
        instanceKey,
        (typeof pino === "function" ? pino : (pino as any).default)({
          level: config.level,
          transport: config.transport
            ? { target: config.transport }
            : undefined,
        }),
      );
    }
    return Logger.instances.get(instanceKey)!;
  }
}
