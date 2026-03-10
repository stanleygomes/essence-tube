import { FastifyInstance } from "fastify";
import { authController } from "./providers/dependencies.js";
import {
  sendCodeSchema,
  verifyCodeSchema,
  refreshTokenSchema,
} from "./controllers/auth/auth.doc.js";

export class AppRouter {
  public register(fastify: FastifyInstance, prefix = "") {
    fastify.post(
      `${prefix}/auth/send-code`,
      { schema: sendCodeSchema },
      authController.sendCode,
    );

    fastify.post(
      `${prefix}/auth/verify-code`,
      { schema: verifyCodeSchema },
      authController.verifyCode,
    );

    fastify.post(
      `${prefix}/auth/refresh-token`,
      { schema: refreshTokenSchema },
      authController.refreshToken,
    );
  }
}
