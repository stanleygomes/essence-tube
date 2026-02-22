import { config } from "../../../config/index.js";
import type { VercelRequest, VercelResponse } from '@vercel/node';

export class GetTokenMiddleware {
  static get(req: VercelRequest, res: VercelResponse): string | undefined {
    const sessionId = this.getBearerTokenId(req);

    if (!sessionId) {
      res.status(401).send("Not authorized!")
      return undefined;
    }

    return sessionId;
  }

  static isPreflight(req: VercelRequest): boolean {
    return req.method === "OPTIONS";
  }

  private static getBearerTokenId(req: VercelRequest): string {
    const authHeader = req.headers['authorization'];

    if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
      return authHeader.replace('Bearer ', '').trim();
    }

    return typeof authHeader === 'string' ? authHeader : '';
  }
}
