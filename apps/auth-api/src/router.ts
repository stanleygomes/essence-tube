import { FastifyInstance } from "fastify";
import { registerAuthRoutes } from "./infra/web/fastify/routes/auth.route.js";

export class AppRouter {
  public register(fastify: FastifyInstance, prefix = ""): void {
    registerAuthRoutes(fastify, prefix);
  }
}

