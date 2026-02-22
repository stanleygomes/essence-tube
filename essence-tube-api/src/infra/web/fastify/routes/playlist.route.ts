import { FastifyRequest, FastifyReply } from 'fastify';
import { BusinessError } from "../../../../domain/errors/BusinessError.js";
import { Logger } from "../../../logger/pino.logger.js";
import { GetVideosFromPlaylistUseCase } from "../../../../application/usecases/get-videos-from-playlist.js";
import { GetPlaylistsUseCase } from "../../../../application/usecases/get-playlists.js";
import { AddVideoToPlaylistUseCase } from "../../../../application/usecases/add-video-to-playlist.js";
import { RemoveVideoFromPlaylistUseCase } from "../../../../application/usecases/remove-video-from-playlist.js";

export class PlaylistRoutes {
  private logger = Logger.getLogger();

  constructor(
    private readonly getVideosFromPlaylistUseCase: GetVideosFromPlaylistUseCase,
    private readonly getPlaylistsUseCase: GetPlaylistsUseCase,
    private readonly addVideoToPlaylistUseCase: AddVideoToPlaylistUseCase,
    private readonly removeVideoFromPlaylistUseCase: RemoveVideoFromPlaylistUseCase,
  ) {}

  getVideosFromPlaylistHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const bearerToken = request.headers.authorization?.replace('Bearer ', '');

      if (!bearerToken) {
        reply.status(401).send({ message: 'Unauthorized' });
        return;
      }

      const { id } = request.query as { id?: string | string[] };
      const playlistId = Array.isArray(id) ? id[0] : id ?? '';

      const response = await this.getVideosFromPlaylistUseCase.execute(bearerToken, playlistId);
      reply.status(200).send(response);
    } catch (error: any) {
      this.logger.error(error);

      if (error instanceof BusinessError) {
        reply.status(400).send({ message: error.message });
        return;
      }

      reply.status(500).send({ message: 'Internal server error!', error: error.message });
    }
  };

  getPlaylistsHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const bearerToken = request.headers.authorization?.replace('Bearer ', '');

      if (!bearerToken) {
        reply.status(401).send({ message: 'Unauthorized' });
        return;
      }

      const response = await this.getPlaylistsUseCase.execute(bearerToken);
      reply.status(200).send(response);
    } catch (error: any) {
      this.logger.error(error);

      if (error instanceof BusinessError) {
        reply.status(400).send({ message: error.message });
        return;
      }

      reply.status(500).send({ message: 'Internal server error!', error: error.message });
    }
  };

  addPlaylistVideoHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const bearerToken = request.headers.authorization?.replace('Bearer ', '');

      if (!bearerToken) {
        reply.status(401).send({ message: 'Unauthorized' });
        return;
      }

      const { playlistId, videoId } = request.query as { playlistId?: string | string[], videoId?: string | string[] };
      const playlistIdValue = Array.isArray(playlistId) ? playlistId[0] : playlistId ?? '';
      const videoIdValue = Array.isArray(videoId) ? videoId[0] : videoId ?? '';

      const response = await this.addVideoToPlaylistUseCase.execute(bearerToken, playlistIdValue, videoIdValue);
      reply.status(200).send(response);
    } catch (error: any) {
      this.logger.error(error);

      if (error instanceof BusinessError) {
        reply.status(400).send({ message: error.message });
        return;
      }

      reply.status(500).send({ message: 'Internal server error!', error: error.message });
    }
  };

  removePlaylistVideoHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const bearerToken = request.headers.authorization?.replace('Bearer ', '');

      if (!bearerToken) {
        reply.status(401).send({ message: 'Unauthorized' });
        return;
      }

      const { id } = request.query as { id?: string | string[] };
      const playlistId = Array.isArray(id) ? id[0] : id ?? '';

      await this.removeVideoFromPlaylistUseCase.execute(bearerToken, playlistId);
      reply.status(200).send("OK");
    } catch (error: any) {
      this.logger.error(error);

      if (error instanceof BusinessError) {
        reply.status(400).send({ message: error.message });
        return;
      }

      reply.status(500).send({ message: 'Internal server error!', error: error.message });
    }
  };
}
