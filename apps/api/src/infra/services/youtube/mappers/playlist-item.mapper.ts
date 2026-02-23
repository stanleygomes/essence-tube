import { PlaylistItem } from '../../../../domain/entities/video.entity.js';
import { YoutubePlaylistItemResponse } from '../responses/youtube-playlist-item.response.js';

export class PlaylistItemMapper {
  static toEntity(item: YoutubePlaylistItemResponse): PlaylistItem {
    return {
      id: item.id,
      videoId: item.snippet?.resourceId?.videoId || "",
      title: item.snippet?.title || "",
      description: item.snippet?.description || "",
      thumbnails: {
        default: item.snippet?.thumbnails?.default?.url || "",
        medium: item.snippet?.thumbnails?.medium?.url || "",
        high: item.snippet?.thumbnails?.high?.url || "",
        maxres: item.snippet?.thumbnails?.maxres?.url || "",
      },
      owner: {
        id: item.snippet?.videoOwnerChannelId || "",
        title: item.snippet?.videoOwnerChannelTitle || "",
      },
      videoPublishedAt: item.contentDetails?.videoPublishedAt || "",
    };
  }
}
