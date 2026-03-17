import { FastifyInstance } from "fastify";
import { authController } from "./providers/dependencies.js";

export class AppRouter {
  public register(fastify: FastifyInstance, prefix = "") {
    authController.registerRoutes(fastify, prefix);
  }
}
