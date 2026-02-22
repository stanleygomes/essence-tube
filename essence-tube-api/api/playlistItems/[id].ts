import '../../src/infra/web/vercel/router.js';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { playlistRoutes } from '../../src/infra/web/vercel/router.js';

export default function handler(req: VercelRequest, res: VercelResponse): void {
  playlistRoutes.removePlaylistVideo(req, res);
}
