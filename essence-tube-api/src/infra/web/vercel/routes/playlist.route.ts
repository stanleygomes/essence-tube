import { VercelRequest, VercelResponse } from "@vercel/node";
import { BusinessError } from "../../../../domain/errors/BusinessError.js";
import { Logger } from "../../../logger/pino.logger.js";
import { GetVideosFromPlaylistUseCase } from "../../../../application/usecases/get-videos-from-playlist.js";
import { CorsMiddleware } from "../middlewares/cors.middleware.js";
import { GetTokenMiddleware } from "../middlewares/get-token.middleware.js";
import { GetPlaylistsUseCase } from "../../../../application/usecases/get-playlists.js";
import { AddVideoToPlaylistUseCase } from "../../../../application/usecases/add-video-to-playlist.js";
import { RemoveVideoFromPlaylistUseCase } from "../../../../application/usecases/remove-video-from-playlist.js";

export class PlaylistRoutes {
  constructor(
    private readonly getVideosFromPlaylistUseCase: GetVideosFromPlaylistUseCase,
    private readonly getPlaylistsUseCase: GetPlaylistsUseCase,
    private readonly addVideoToPlaylistUseCase: AddVideoToPlaylistUseCase,
    private readonly removeVideoFromPlaylistUseCase: RemoveVideoFromPlaylistUseCase,
  ) {}

  private logger = Logger.getLogger();

  async getVideosFromPlaylist(req: VercelRequest, res: VercelResponse): Promise<void> {
    if (CorsMiddleware.apply(req, res)) return;

    const bearerToken = GetTokenMiddleware.get(req, res);
    if (!bearerToken) {
      return;
    }

    if (req.method !== 'GET') {
      res.status(405).json({ message: 'Method not allowed!' });
      return;
    }

    try {
      const playlistId = typeof req.query.id === 'string' ? req.query.id : Array.isArray(req.query.id) ? req.query.id[0] : undefined;
      const response = await this.getVideosFromPlaylistUseCase.execute(bearerToken ?? '', playlistId ?? '');

      res.status(200).json(response);
    } catch (error: any) {
      this.logger.error(error);
  
      if (error instanceof BusinessError) {
        res.status(400).json({ message: error.message });
        return;
      }
  
      res.status(500).json({ message: 'Internal server error!', error: error.message });
    }
  }

  async getPlaylists(req: VercelRequest, res: VercelResponse): Promise<void> {
    if (CorsMiddleware.apply(req, res)) return;

    const bearerToken = GetTokenMiddleware.get(req, res);
    if (!bearerToken) {
      return;
    }

    if (req.method !== 'GET') {
      res.status(405).json({ message: 'Method not allowed!' });
      return;
    }

    try {
      const response = await this.getPlaylistsUseCase.execute(bearerToken);

      res.status(200).json(response);
    } catch (error: any) {
      this.logger.error(error);
  
      if (error instanceof BusinessError) {
        res.status(400).json({ message: error.message });
        return;
      }
  
      res.status(500).json({ message: 'Internal server error!', error: error.message });
    }
  }

  async addPlaylistVideo(req: VercelRequest, res: VercelResponse): Promise<void> {
    if (CorsMiddleware.apply(req, res)) return;

    const bearerToken = GetTokenMiddleware.get(req, res);
    if (!bearerToken) {
      return;
    }

    if (req.method !== 'POST') {
      res.status(405).json({ message: 'Method not allowed!' });
      return;
    }

    try {
      const playlistId = typeof req.query.playlistId === 'string' ? req.query.playlistId : Array.isArray(req.query.playlistId) ? req.query.playlistId[0] : '';
      const videoId = typeof req.query.videoId === 'string' ? req.query.videoId : Array.isArray(req.query.videoId) ? req.query.videoId[0] : '';
      const response = await this.addVideoToPlaylistUseCase.execute(bearerToken, playlistId, videoId);

      res.status(200).json(response);
    } catch (error: any) {
      this.logger.error(error);
  
      if (error instanceof BusinessError) {
        res.status(400).json({ message: error.message });
        return;
      }
  
      res.status(500).json({ message: 'Internal server error!', error: error.message });
    }
  }

  async removePlaylistVideo(req: VercelRequest, res: VercelResponse): Promise<void> {
    if (CorsMiddleware.apply(req, res)) return;

    const bearerToken = GetTokenMiddleware.get(req, res);
    if (!bearerToken) {
      return;
    }

    if (req.method !== 'DELETE') {
      res.status(405).json({ message: 'Method not allowed!' });
      return;
    }

    try {
      const playlistId = this.getQueryId(req);
      await this.removeVideoFromPlaylistUseCase.execute(bearerToken, playlistId);

      res.status(200).json("OK");
    } catch (error: any) {
      this.logger.error(error);
  
      if (error instanceof BusinessError) {
        res.status(400).json({ message: error.message });
        return;
      }
  
      res.status(500).json({ message: 'Internal server error!', error: error.message });
    }
  }

  private getQueryId(req: VercelRequest): string | undefined {
    if (typeof req.query.id === 'string') {
      return req.query.id;
    }
    
    if (Array.isArray(req.query.id)) {
      return req.query.id[0]
    }

    return undefined;
  }
}
