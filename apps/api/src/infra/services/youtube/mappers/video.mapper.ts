import { VideoMetadata } from '../../../../domain/entities/video.entity.js';
import { YoutubeVideoResponse } from '../responses/youtube-search.response.js';

export class VideoMapper {
  static toEntity(item: YoutubeVideoResponse): VideoMetadata {
    return {
      id: item.id,
      title: item.snippet?.title || "",
      description: item.snippet?.description || "",
      statistics: item.statistics || {},
      contentDetails: item.contentDetails || {},
      thumbnails: {
        default: item.snippet?.thumbnails?.default?.url || "",
        medium: item.snippet?.thumbnails?.medium?.url || "",
        high: item.snippet?.thumbnails?.high?.url || "",
        maxres: item.snippet?.thumbnails?.maxres?.url || "",
      },
    };
  }
}
