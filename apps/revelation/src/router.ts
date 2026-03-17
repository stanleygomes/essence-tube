import { FastifyInstance } from "fastify";
import { revelationController } from "./providers/dependencies.js";
import { executePromptDoc } from "./controllers/revelation/revelation.doc.js";
import { AuthMiddleware } from "./middlewares/auth.middleware.js";

export class AppRouter {
  public register(fastify: FastifyInstance, prefix = "") {
    fastify.post<{ Body: { prompt: string } }>(
      `${prefix}/revelation/execute`,
      {
        preHandler: AuthMiddleware.authorize,
        schema: executePromptDoc,
      },
      revelationController.executePrompt,
    );
  }
}
