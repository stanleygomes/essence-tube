import { FastifyRequest, FastifyReply } from "fastify";
import { SendEmailCodeService } from "../../services/send-email-code.service.js";
import { VerifyEmailCodeService } from "../../services/verify-email-code.service.js";
import { RefreshTokenService } from "../../services/refresh-token.service.js";
import { validateSendCode } from "../../schemas/validators/send-code.validator.js";
import { validateVerifyCode } from "../../schemas/validators/verify-code.validator.js";
import { validateRefreshToken } from "../../schemas/validators/refresh-token.validator.js";

export class AuthController {
  constructor(
    private readonly sendEmailCodeService: SendEmailCodeService,
    private readonly verifyEmailCodeService: VerifyEmailCodeService,
    private readonly refreshTokenService: RefreshTokenService,
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
}
