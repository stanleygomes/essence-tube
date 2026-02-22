import { FastifyRequest, FastifyReply } from 'fastify';
import { BusinessError } from "../../../../domain/errors/BusinessError.js";
import { Logger } from "../../../logger/pino.logger.js";
import { GetSubscribedChannelsUseCase } from "../../../../application/usecases/get-subscribed-channels.js";
import { GetLatestVideosFromChannelUseCase } from "../../../../application/usecases/get-latest-videos-from-channel.js";

export class SubscriptionRoutes {
  private logger = Logger.getLogger();

  constructor(
    private readonly getSubscribedChannelsUseCase: GetSubscribedChannelsUseCase,
    private readonly getLatestVideosFromChannelUseCase: GetLatestVideosFromChannelUseCase,
  ) {}

  getChannelsHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const bearerToken = request.headers.authorization?.replace('Bearer ', '');

      if (!bearerToken) {
        reply.status(401).send({ message: 'Unauthorized' });
        return;
      }

      const response = await this.getSubscribedChannelsUseCase.execute(bearerToken);
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

  getLatestVideosFromChannelHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const bearerToken = request.headers.authorization?.replace('Bearer ', '');

      if (!bearerToken) {
        reply.status(401).send({ message: 'Unauthorized' });
        return;
      }

      const { id } = request.query as { id?: string | string[] };
      const channelId = Array.isArray(id) ? id[0] : id ?? '';

      const response = await this.getLatestVideosFromChannelUseCase.execute(bearerToken, channelId);
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
