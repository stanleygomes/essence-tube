import { Channel } from '../../../../domain/entities/channel.entity.js';
import { YoutubeChannelResponse } from '../responses/youtube-channel.response.js';

export class ChannelMapper {
  static toEntity(item: YoutubeChannelResponse): Channel {
    return {
      id: item.snippet?.resourceId?.channelId || "",
      title: item.snippet?.title || "",
      description: item.snippet?.description || "",
      thumbnails: {
        default: item.snippet?.thumbnails?.default?.url || "",
        medium: item.snippet?.thumbnails?.medium?.url || "",
        high: item.snippet?.thumbnails?.high?.url || "",
      },
    };
  }
}
