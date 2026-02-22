import { config } from "../../../config/index.js";
import type { VercelRequest, VercelResponse } from '@vercel/node';

export class CorsMiddleware {
  static apply(req: VercelRequest, res: VercelResponse): boolean {
    const {
      allowedOrigin,
      allowedMethods,
      allowedHeaders,
    } = config.app.cors;

    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    res.setHeader("Access-Control-Allow-Methods", allowedMethods);
    res.setHeader("Access-Control-Allow-Headers", allowedHeaders);

    if (CorsMiddleware.isPreflight(req)) {
      res.status(200).end();
      return true;
    }

    return false;
  }

  static isPreflight(req: VercelRequest): boolean {
    return req.method === "OPTIONS";
  }
}
