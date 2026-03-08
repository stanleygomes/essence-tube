import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { BusinessError } from "../../../../errors/BusinessError.js";
import { Logger } from "../../../../config/pino.logger.js";
import { config } from "../../../../config/environment.js";
import {
  sendEmailCodeUseCase,
  verifyEmailCodeUseCase,
  getGoogleUrlUseCase,
  getGithubUrlUseCase,
  getAppleUrlUseCase,
  googleCallbackUseCase,
  githubCallbackUseCase,
  appleCallbackUseCase,
} from "../../../providers/dependencies.js";

const logger = Logger.getLogger();

function handleError(error: unknown, reply: FastifyReply): void {
  logger.error(error);

  if (error instanceof BusinessError) {
    reply.status(400).send({ message: error.message });
    return;
  }

  const msg = error instanceof Error ? error.message : "Unknown error";
  reply.status(500).send({ message: "Internal server error", error: msg });
}

function redirectToFrontend(reply: FastifyReply, token: string): void {
  reply.redirect(`${config.app.web.baseUrl}?token=${token}`, 302);
}

export function registerAuthRoutes(fastify: FastifyInstance, prefix = ""): void {
  fastify.post(`${prefix}/auth/email/code`, async (request: FastifyRequest, reply: FastifyReply) => {
    const { email } = request.body as { email?: string };

    if (!email) {
      reply.status(400).send({ message: "Email is required" });
      return;
    }

    try {
      await sendEmailCodeUseCase.execute(email);
      reply.send({ message: "Code sent" });
    } catch (error) {
      handleError(error, reply);
    }
  });

  fastify.post(`${prefix}/auth/email/verify`, async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, code } = request.body as { email?: string; code?: string };

    if (!email || !code) {
      reply.status(400).send({ message: "Email and code are required" });
      return;
    }

    try {
      const token = verifyEmailCodeUseCase.execute(email, code);
      reply.send({ token });
    } catch (error) {
      handleError(error, reply);
    }
  });

  fastify.get(`${prefix}/auth/google`, async (_request: FastifyRequest, reply: FastifyReply) => {
    reply.redirect(getGoogleUrlUseCase.execute(), 302);
  });

  fastify.get(`${prefix}/auth/google/callback`, async (request: FastifyRequest, reply: FastifyReply) => {
    const { code } = request.query as { code?: string };

    if (!code) {
      reply.status(400).send({ message: "Missing code" });
      return;
    }

    try {
      const token = await googleCallbackUseCase.execute(code);
      redirectToFrontend(reply, token);
    } catch (error) {
      handleError(error, reply);
    }
  });

  fastify.get(`${prefix}/auth/github`, async (_request: FastifyRequest, reply: FastifyReply) => {
    reply.redirect(getGithubUrlUseCase.execute(), 302);
  });

  fastify.get(`${prefix}/auth/github/callback`, async (request: FastifyRequest, reply: FastifyReply) => {
    const { code } = request.query as { code?: string };

    if (!code) {
      reply.status(400).send({ message: "Missing code" });
      return;
    }

    try {
      const token = await githubCallbackUseCase.execute(code);
      redirectToFrontend(reply, token);
    } catch (error) {
      handleError(error, reply);
    }
  });

  fastify.get(`${prefix}/auth/apple`, async (_request: FastifyRequest, reply: FastifyReply) => {
    reply.redirect(getAppleUrlUseCase.execute(), 302);
  });

  fastify.post(`${prefix}/auth/apple/callback`, async (request: FastifyRequest, reply: FastifyReply) => {
    const { code } = request.body as { code?: string };

    if (!code) {
      reply.status(400).send({ message: "Missing code" });
      return;
    }

    try {
      const token = await appleCallbackUseCase.execute(code);
      redirectToFrontend(reply, token);
    } catch (error) {
      handleError(error, reply);
    }
  });
}
