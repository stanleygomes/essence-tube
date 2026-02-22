import '../../src/infra/web/vercel/router.js';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { videoRoutes } from '../../src/infra/web/vercel/router.js';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  videoRoutes.getVideo(req, res);
}
