import { FastifyInstance, FastifyReply } from "fastify";
import {
  SendCodeRequest,
  VerifyCodeRequest,
  RefreshTokenRequest,
  TokenRequest,
  CreateClientRequest,
} from "../../types/auth-request.js";
import { SendEmailCodeService } from "../../services/send-email-code.service.js";
import { VerifyEmailCodeService } from "../../services/verify-email-code.service.js";
import { RefreshTokenService } from "../../services/refresh-token.service.js";
import { ClientCredentialsService } from "../../services/client-credentials.service.js";
import { CreateApiClientService } from "../../services/create-api-client.service.js";
import { validateSendCode } from "../../schemas/validators/send-code.validator.js";
import { validateVerifyCode } from "../../schemas/validators/verify-code.validator.js";
import { validateRefreshToken } from "../../schemas/validators/refresh-token.validator.js";
import { validateClientCredentials } from "../../schemas/validators/client-credentials.validator.js";
import { validateCreateClient } from "../../schemas/validators/create-client.validator.js";
import {
  createClientSchema,
  refreshTokenSchema,
  sendCodeSchema,
  tokenSchema,
  verifyCodeSchema,
} from "./auth.doc.js";

export class AuthController {
  constructor(
    private readonly sendEmailCodeService: SendEmailCodeService,
    private readonly verifyEmailCodeService: VerifyEmailCodeService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly clientCredentialsService: ClientCredentialsService,
    private readonly createApiClientService: CreateApiClientService,
  ) {}

  registerRoutes(fastify: FastifyInstance, prefix = "") {
    const authRateLimit = fastify.rateLimit({
      max: 10,
      timeWindow: 60 * 1000,
    });

    fastify.post<{ Body: { email: string } }>(
      `${prefix}/v1/auth/send-code`,
      { schema: sendCodeSchema, onRequest: authRateLimit },
      this.sendCode,
    );

    fastify.post<{ Body: { email: string; code: string } }>(
      `${prefix}/v1/auth/verify-code`,
      { schema: verifyCodeSchema, onRequest: authRateLimit },
      this.verifyCode,
    );

    fastify.post<{ Body: { refreshToken: string } }>(
      `${prefix}/v1/auth/refresh-token`,
      { schema: refreshTokenSchema, onRequest: authRateLimit },
      this.refreshToken,
    );

    fastify.post<{
      Body: {
        grant_type: "client_credentials";
        client_id: string;
        client_secret: string;
      };
    }>(
      `${prefix}/v1/auth/token`,
      { schema: tokenSchema, onRequest: authRateLimit },
      this.token,
    );

    fastify.post<{ Body: { name: string } }>(
      `${prefix}/v1/auth/clients`,
      { schema: createClientSchema, onRequest: authRateLimit },
      this.createClient,
    );
  }

  sendCode = async (request: SendCodeRequest, reply: FastifyReply) => {
    const validatedData = validateSendCode(request.body);
    await this.sendEmailCodeService.execute(validatedData.email);
    reply.send({ message: "Verification code sent" });
  };

  verifyCode = async (request: VerifyCodeRequest, reply: FastifyReply) => {
    const validatedData = validateVerifyCode(request.body);
    const result = await this.verifyEmailCodeService.execute(
      validatedData.email,
      validatedData.code,
    );
    reply.send(result);
  };

  refreshToken = (request: RefreshTokenRequest, reply: FastifyReply) => {
    const validatedData = validateRefreshToken(request.body);
    const result = this.refreshTokenService.execute(validatedData.refreshToken);
    reply.send(result);
  };

  token = async (request: TokenRequest, reply: FastifyReply) => {
    const validatedData = validateClientCredentials(request.body);
    const result = await this.clientCredentialsService.execute(
      validatedData.client_id,
      validatedData.client_secret,
    );
    reply.send(result);
  };

  createClient = async (request: CreateClientRequest, reply: FastifyReply) => {
    const validatedData = validateCreateClient(request.body);
    const result = await this.createApiClientService.execute(
      validatedData.name,
    );
    reply.status(201).send(result);
  };
}
