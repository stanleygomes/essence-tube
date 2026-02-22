export interface YoutubeVideoResponse {
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
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean,
    contentRating: string;
    projection: string;
  };
  statistics?: {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
}
