import '../../../src/infra/providers/dependencies.js';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { subscriptionRoutes } from '../../../src/infra/web/vercel/router.js';

export default function handler(req: VercelRequest, res: VercelResponse): void {
  subscriptionRoutes.getLatestVideosFromChannel(req, res);
}
