import { Video } from '../../../../domain/entities/video.entity.js';
import { YoutubeVideoSearchResponse } from '../responses/youtube-video.response.js';

export class VideoSearchMapper {
  static toEntity(item: YoutubeVideoSearchResponse): Video {
    return {
      id: item.id.videoId,
      title: item.snippet?.title || "",
      description: item.snippet?.description || "",
      videoPublishedAt: item.snippet?.publishedAt || "",
      thumbnails: {
        default: item.snippet?.thumbnails?.default?.url || "",
        medium: item.snippet?.thumbnails?.medium?.url || "",
        high: item.snippet?.thumbnails?.high?.url || "",
        maxres: item.snippet?.thumbnails?.maxres?.url || "",
      },
      channelId: item.snippet?.channelId || "",
      channelTitle: item.snippet?.channelTitle || "",
    };
  }
}
