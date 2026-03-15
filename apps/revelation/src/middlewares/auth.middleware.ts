import { JwtService } from "@logos/jwt";
import { FastifyReply, FastifyRequest } from "fastify";
import { AuthError } from "../errors/AuthError.js";
import { config } from "../config/environment.js";
import type { UserAuth } from "../types/user-auth.js";

const jwtService = new JwtService(
  config.auth.jwtPrivateKey,
  config.auth.jwtPublicKey,
);

type AuthenticatedRequest = FastifyRequest & {
  user: UserAuth;
};

export class AuthMiddleware {
  static authorize(request: FastifyRequest, reply: FastifyReply) {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AuthError("Not authorized");
    }

    const token = authHeader.replace("Bearer ", "").trim();
    const payload = jwtService.verify(token);

    if (!payload.id || !payload.email) {
      throw new AuthError("Invalid token payload");
    }

    (request as AuthenticatedRequest).user = {
      id: payload.id,
      email: payload.email,
    };

    return reply;
  }
}
