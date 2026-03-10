import { FastifyRequest, FastifyReply } from "fastify";
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

export class AuthController {
  constructor(
    private readonly sendEmailCodeService: SendEmailCodeService,
    private readonly verifyEmailCodeService: VerifyEmailCodeService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly clientCredentialsService: ClientCredentialsService,
    private readonly createApiClientService: CreateApiClientService,
  ) {}

  sendCode = async (
    request: FastifyRequest<{ Body: { email: string } }>,
    reply: FastifyReply,
  ) => {
    const validatedData = validateSendCode(request.body);
    await this.sendEmailCodeService.execute(validatedData.email);
    reply.send({ message: "Verification code sent" });
  };

  verifyCode = async (
    request: FastifyRequest<{ Body: { email: string; code: string } }>,
    reply: FastifyReply,
  ) => {
    const validatedData = validateVerifyCode(request.body);
    const result = await this.verifyEmailCodeService.execute(
      validatedData.email,
      validatedData.code,
    );
    reply.send(result);
  };

  refreshToken = (
    request: FastifyRequest<{ Body: { refreshToken: string } }>,
    reply: FastifyReply,
  ) => {
    const validatedData = validateRefreshToken(request.body);
    const result = this.refreshTokenService.execute(validatedData.refreshToken);
    reply.send(result);
  };

  token = async (
    request: FastifyRequest<{
      Body: { grant_type: string; client_id: string; client_secret: string };
    }>,
    reply: FastifyReply,
  ) => {
    const validatedData = validateClientCredentials(request.body);
    const result = await this.clientCredentialsService.execute(
      validatedData.client_id,
      validatedData.client_secret,
    );
    reply.send(result);
  };

  createClient = async (
    request: FastifyRequest<{ Body: { name: string } }>,
    reply: FastifyReply,
  ) => {
    const validatedData = validateCreateClient(request.body);
    const result = await this.createApiClientService.execute(validatedData.name);
    reply.status(201).send(result);
  };
}

