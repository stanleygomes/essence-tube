import axios from 'axios';
import { config } from '../../config/index.js';
import { Logger } from '../../logger/pino.logger.js';
import { PlaylistMapper } from './mappers/playlist.mapper.js';
import { PlaylistItemMapper } from './mappers/playlist-item.mapper.js';
import { VideoMapper } from './mappers/video.mapper.js';
import { VideoSearchMapper } from './mappers/video-search.mapper.js';
import { ChannelMapper } from './mappers/channel.mapper.js';
import { Playlist } from '../../../domain/entities/playlist.entity.js';
import { Video, VideoMetadata, LatestVideo, PlaylistItem } from '../../../domain/entities/video.entity.js';
import { Channel } from '../../../domain/entities/channel.entity.js';
import { PartnerMediaService } from '../../../domain/port/services/partner-media.service.js';

const { apiBaseUrl } = config.services.youtube;

interface YoutubeApiRequestParams {
  token: string;
  endpoint: string;
  method?: 'GET' | 'POST' | 'DELETE';
  params?: Record<string, any>;
  data?: any;
}

export class YoutubeService implements PartnerMediaService {
  private logger = Logger.getLogger();

  async getPlaylistList(token: string, maxResults = 50): Promise<Playlist[]> {
    const data = await this.youtubeApiRequest({
      token,
      endpoint: 'playlists',
      method: 'GET',
      params: {
        part: 'snippet,contentDetails',
        maxResults,
        mine: true,
      },
    });

    return (data.items || [])
      .map(PlaylistMapper.toEntity)
      .sort((a: any, b: any) => a.title.localeCompare(b.title));
  }

  async getPlaylistItems(token: string, playlistId: string, maxResults = 50): Promise<Video[]> {
    if (!playlistId) throw new Error("playlistId is required!");

    const data = await this.youtubeApiRequest({
      token,
      endpoint: 'playlistItems',
      method: 'GET',
      params: {
        part: 'snippet,contentDetails',
        maxResults,
        playlistId,
        mine: true,
      },
    });

    return (data.items || [])
      .sort((a: any, b: any) => new Date(b.snippet.publishedAt).getTime() - new Date(a.snippet.publishedAt).getTime())
      .map(PlaylistItemMapper.toEntity);
  }

  async getVideoMetadata(token: string, videoId: string): Promise<VideoMetadata | null> {
    if (!videoId) throw new Error("videoId is required!");

    const data = await this.youtubeApiRequest({
      token,
      endpoint: 'videos',
      method: 'GET',
      params: {
        part: 'snippet,contentDetails,statistics',
        id: videoId,
      },
    });

    return data.items && data.items.length > 0 ? VideoMapper.toEntity(data.items[0]) : null;
  }

  async getSubscribedChannels(token: string, maxResults = 50): Promise<Channel[]> {
    const data = await this.youtubeApiRequest({
      token,
      endpoint: 'subscriptions',
      method: 'GET',
      params: {
        part: 'snippet,contentDetails',
        mine: true,
        maxResults,
      },
    });

    return (data.items || [])
      .map(ChannelMapper.toEntity)
      .sort((a: any, b: any) => a.title.localeCompare(b.title));
  }

  async getLatestVideosFromChannel(token: string, channelId: string, maxResults = 10): Promise<LatestVideo[]> {
    if (!channelId) throw new Error("channelId is required!");

    const data = await this.youtubeApiRequest({
      token,
      endpoint: 'search',
      method: 'GET',
      params: {
        part: 'snippet',
        channelId,
        order: 'date',
        maxResults,
        type: 'video',
      },
    });

    return (data.items || []).map(VideoSearchMapper.toEntity);
  }

  async removeVideoFromPlaylist(token: string, playlistItemId: string): Promise<void> {
    if (!playlistItemId) throw new Error("playlistItemId is required!");

    await this.youtubeApiRequest({
      token,
      endpoint: 'playlistItems',
      method: 'DELETE',
      params: {
        id: playlistItemId,
      },
    });
  }

  async addVideoToPlaylist(token: string, playlistId: string, videoId: string): Promise<PlaylistItem> {
    if (!playlistId || !videoId) throw new Error("playlistId e videoId are required!");

    const data = {
      snippet: {
        playlistId,
        resourceId: {
          kind: "youtube#video",
          videoId,
        },
      },
    };

    const playlistItemAdded = await this.youtubeApiRequest({
      token,
      endpoint: 'playlistItems',
      method: 'POST',
      params: {
        part: 'snippet',
      },
      data,
    });

    return PlaylistItemMapper.toEntity(playlistItemAdded)
  }

  private buildHeaders(token: string) {
    return {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    };
  }

  private async youtubeApiRequest({
    token,
    endpoint,
    method = 'GET',
    params = {},
    data = null,
  }: YoutubeApiRequestParams): Promise<any> {
    try {
      const res = await axios({
        url: `${apiBaseUrl}/${endpoint}`,
        method,
        headers: this.buildHeaders(token),
        params,
        data,
      });
      return res.data;
    } catch (error: any) {
      this.logger.error(error);
      throw error;
    }
  }
}
