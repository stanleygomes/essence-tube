import { FastifyRequest, FastifyReply } from 'fastify';
import { GetUrlConsentUseCase } from '../../../../application/usecases/get-url-consent-use-case.js';
import { GetUrlRedirectBackUseCase } from '../../../../application/usecases/get-url-redirect-back.js';
import { BusinessError } from '../../../../domain/errors/BusinessError.js';
import { Logger } from '../../../logger/pino.logger.js';

export class AuthRoutes {
  private logger = Logger.getLogger();

  constructor(
    private readonly getUrlConsentUseCase: GetUrlConsentUseCase,
    private readonly getUrlRedirectBackUseCase: GetUrlRedirectBackUseCase,
  ) {}

  getUrlConsentHandler = (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const redirectUrl = this.getUrlConsentUseCase.execute();
      reply.redirect(redirectUrl, 302);
    } catch (error: any) {
      this.logger.error(error);
      reply.status(500).send({ message: 'Internal server error!', error: error.message });
    }
  };

  getUrlRedirectBackHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { code } = request.query as { code?: string };

      if (!code) {
        reply.status(400).send({ message: 'Missing authCode parameter.' });
        return;
      }

      const redirectUrl = await this.getUrlRedirectBackUseCase.execute(code);
      reply.redirect(redirectUrl, 302);
    } catch (error: any) {
      this.logger.error(error);

      if (error instanceof BusinessError) {
        reply.status(400).send({ message: error.message });
        return;
      }

      reply.status(500).send({ message: 'Internal server error!', error: error.message });
    }
  };
}
