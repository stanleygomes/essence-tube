import "../src/infra/web/vercel/router.js";
import type { VercelRequest, VercelResponse } from "@vercel/node";
// import { authRoutes } from "../src/infra/web/vercel/router.js";

export default function handler(req: VercelRequest, res: VercelResponse): void {
  console.log(req, res);
  // authRoutes.getUrlConsent(req, res);
}
