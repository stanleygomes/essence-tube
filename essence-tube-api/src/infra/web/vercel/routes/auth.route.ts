import { VercelRequest, VercelResponse } from "@vercel/node";
import { GetUrlConsentUseCase } from "../../../../application/usecases/get-url-consent-use-case.js";
import { BusinessError } from "../../../../domain/errors/BusinessError.js";
import { Logger } from "../../../logger/pino.logger.js";
import { GetUrlRedirectBackUseCase } from "../../../../application/usecases/get-url-redirect-back.js";

export class AuthRoutes {
  constructor(
    private readonly getUrlConsentUseCase: GetUrlConsentUseCase,
    private readonly getUrlRedirectBackUseCase: GetUrlRedirectBackUseCase,
  ) {}

  private logger = Logger.getLogger();
  
  getUrlConsent(req: VercelRequest, res: VercelResponse): void {
    if (req.method !== 'GET') {
      res.status(405).json({ message: 'Method not allowed!' });
      return;
    }

    const redirectUrl = this.getUrlConsentUseCase.execute();
    res.redirect(302, redirectUrl);
  }

  async getUrlRedirectBack(req: VercelRequest, res: VercelResponse): Promise<void> {
    if (req.method !== 'GET') {
      res.status(405).json({ message: 'Method not allowed!' });
      return;
    }

    try {
      const authCode = typeof req.query.code === 'string' ? req.query.code : Array.isArray(req.query.code) ? req.query.code[0] : undefined;
      if (!authCode) {
        res.status(400).json({ message: 'Missing authCode parameter.' });
        return;
      }
  
      const redirectUrl = await this.getUrlRedirectBackUseCase.execute(authCode);
      res.redirect(302, redirectUrl);
    } catch (error: any) {
      this.logger.error(error);
  
      if (error instanceof BusinessError) {
        res.status(400).json({ message: error.message });
        return;
      }
  
      res.status(500).json({ message: 'Internal server error!', error: error.message });
    }
  }
}
