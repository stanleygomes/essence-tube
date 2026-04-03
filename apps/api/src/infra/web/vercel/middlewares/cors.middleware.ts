import { config } from "../../../config/index.js";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export class CorsMiddleware {
  static apply(req: VercelRequest, res: VercelResponse): boolean {
    const { allowedOrigin, allowedMethods, allowedHeaders } = config.app.cors;

    const requestOrigin = (req.headers.origin as string) || "";
    let originToSet: string | undefined;

    if (allowedOrigin === "*" || !allowedOrigin) {
      originToSet = "*";
    } else if (typeof allowedOrigin === "string") {
      originToSet = allowedOrigin;
    } else if (Array.isArray(allowedOrigin)) {
      if (allowedOrigin.includes(requestOrigin)) {
        originToSet = requestOrigin;
      } else {
        // Fallback to the first allowed origin to avoid leaving it empty
        originToSet = allowedOrigin[0];
      }
    }

    if (originToSet) {
      res.setHeader("Access-Control-Allow-Origin", originToSet);
    }

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
