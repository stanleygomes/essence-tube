import { Playlist } from '../../entities/playlist.entity.js';
import { Video, VideoMetadata, LatestVideo, PlaylistItem } from '../../entities/video.entity.js';
import { Channel } from '../../entities/channel.entity.js';

export interface PartnerMediaService {
  getPlaylistList(token: string, maxResults?: number): Promise<Playlist[]>;
  getPlaylistItems(token: string, playlistId: string, maxResults?: number): Promise<Video[]>;
  getVideoMetadata(token: string, videoId: string): Promise<VideoMetadata | null>;
  getSubscribedChannels(token: string, maxResults?: number): Promise<Channel[]>;
  getLatestVideosFromChannel(token: string, channelId: string, maxResults?: number): Promise<LatestVideo[]>;
  addVideoToPlaylist(token: string, playlistId: string, videoId: string): Promise<PlaylistItem>;
  removeVideoFromPlaylist(token: string, playlistItemId: string): Promise<void>;
}
