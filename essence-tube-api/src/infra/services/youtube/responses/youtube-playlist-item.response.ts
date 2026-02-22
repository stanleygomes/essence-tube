export interface YoutubePlaylistItemResponse {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt?: string;
    channelId?: string;
    channelTitle?: string;
    thumbnails: {
      default?: { url: string };
      medium?: { url: string };
      high?: { url: string };
      maxres?: { url: string };
    };
    resourceId?: {
      videoId?: string;
    };
    videoOwnerChannelId?: string;
    videoOwnerChannelTitle?: string;
  };
  contentDetails?: {
    videoPublishedAt?: string;
    [key: string]: any;
  };
  statistics?: Record<string, any>;
}
