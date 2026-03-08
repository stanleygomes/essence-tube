import { FastifyRequest, FastifyReply } from "fastify";
import { SendEmailCodeUseCase } from "../usecases/send-email-code.usecase.js";
import { VerifyEmailCodeUseCase } from "../usecases/verify-email-code.usecase.js";
import { AuthError } from "../errors/AuthError.js";
import { BusinessError } from "../errors/BusinessError.js";
import { Logger } from "../config/pino.logger.js";

export class AuthController {
  private logger = Logger.getLogger();

  constructor(
    private readonly sendEmailCodeUseCase: SendEmailCodeUseCase,
    private readonly verifyEmailCodeUseCase: VerifyEmailCodeUseCase,
  ) {}

  sendCode = async (
    request: FastifyRequest<{ Body: { email: string } }>,
    reply: FastifyReply,
  ) => {
    try {
      await this.sendEmailCodeUseCase.execute(request.body.email);
      reply.send({ message: "Verification code sent" });
    } catch (error: any) {
      this.logger.error(error);
      reply.status(500).send({ message: "Internal server error" });
    }
  };

  verifyCode = async (
    request: FastifyRequest<{ Body: { email: string; code: string } }>,
    reply: FastifyReply,
  ) => {
    try {
      const result = await this.verifyEmailCodeUseCase.execute(
        request.body.email,
        request.body.code,
      );
      reply.send(result);
    } catch (error: any) {
      this.logger.error(error);

      if (error instanceof AuthError || error instanceof BusinessError) {
        reply.status(400).send({ message: error.message });
        return;
      }

      reply.status(500).send({ message: "Internal server error" });
    }
  };
}
