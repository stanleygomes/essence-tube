import { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { AuthError } from "../errors/AuthError.js";
import { BusinessError } from "../errors/BusinessError.js";
import { ConcurrencyError } from "../errors/ConcurrencyError.js";
import { PinoLogger } from "../config/pino.logger.js";

export function setupErrorHandler(fastify: FastifyInstance) {
  const logger = PinoLogger.getLogger();

  fastify.setErrorHandler((error, request, reply) => {
    logger.error(error);

    if (error instanceof ZodError) {
      reply
        .status(400)
        .send({ message: "Validation error", errors: error.issues });
      return;
    }

    if (error instanceof AuthError) {
      reply.status(401).send({ message: error.message });
      return;
    }

    if (error instanceof ConcurrencyError) {
      reply.status(423).send({ message: error.message });
      return;
    }

    if (error instanceof BusinessError) {
      reply.status(400).send({ message: error.message });
      return;
    }

    reply.status(500).send({ message: "Internal server error" });
  });
}
