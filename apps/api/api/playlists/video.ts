import "../../src/infra/web/vercel/router.js";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { playlistRoutes } from "../../src/infra/web/vercel/router.js";
import { CorsMiddleware } from "../../src/infra/web/vercel/middlewares/cors.middleware.js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (CorsMiddleware.apply(req, res)) return;

  if (req.method === "POST") {
    await playlistRoutes.addPlaylistVideo(req, res);
  } else if (req.method === "DELETE") {
    await playlistRoutes.removePlaylistVideo(req, res);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
