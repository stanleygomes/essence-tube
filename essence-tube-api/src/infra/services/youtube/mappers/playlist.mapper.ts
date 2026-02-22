import { Playlist } from '../../../../domain/entities/playlist.entity.js';
import { YoutubePlaylistResponse } from '../responses/youtube-playlist.response.js';

export class PlaylistMapper {
  static toEntity(item: YoutubePlaylistResponse): Playlist {
    return {
      id: item.id,
      title: item.snippet?.title || "",
      description: item.snippet?.description || "",
      thumbnails: {
        default: item.snippet?.thumbnails?.default?.url || "",
        medium: item.snippet?.thumbnails?.medium?.url || "",
        high: item.snippet?.thumbnails?.high?.url || "",
        maxres: item.snippet?.thumbnails?.maxres?.url || "",
      },
    };
  }
}
