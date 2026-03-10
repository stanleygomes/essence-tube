import { FastifyInstance } from "fastify";
import { authController, oauthController } from "./providers/dependencies.js";
import {
  sendCodeSchema,
  verifyCodeSchema,
  refreshTokenSchema,
} from "./controllers/auth/auth.doc.js";
import {
  oauthTokenSchema,
  registerOAuthClientSchema,
} from "./controllers/oauth/oauth.doc.js";

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

    fastify.post(
      `${prefix}/oauth/token`,
      { schema: oauthTokenSchema },
      oauthController.token,
    );

    fastify.post(
      `${prefix}/oauth/clients`,
      { schema: registerOAuthClientSchema },
      oauthController.registerClient,
    );
  }
}

