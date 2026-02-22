import { FastifyRequest, FastifyReply } from 'fastify';
import { BusinessError } from "../../../../domain/errors/BusinessError.js";
import { Logger } from "../../../logger/pino.logger.js";
import { GetVideoUseCase } from "../../../../application/usecases/get-video-use-case.js";

export class VideoRoutes {
  private logger = Logger.getLogger();

  constructor(private readonly getVideoUseCase: GetVideoUseCase) {}

  getVideoHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const bearerToken = request.headers.authorization?.replace('Bearer ', '');

      if (!bearerToken) {
        reply.status(401).send({ message: 'Unauthorized' });
        return;
      }

      const { id } = request.query as { id?: string | string[] };
      const videoId = Array.isArray(id) ? id[0] : id;

      const response = await this.getVideoUseCase.execute(bearerToken, videoId ?? '');
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
}
