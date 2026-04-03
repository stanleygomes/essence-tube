import "../../../src/infra/providers/dependencies.js";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { subscriptionRoutes } from "../../../src/infra/web/vercel/router.js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  await subscriptionRoutes.getLatestVideosFromChannel(req, res);
}
