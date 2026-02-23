export interface YoutubeChannelResponse {
  id: string;
  snippet: {
    title: string;
    description: string;
    resourceId: {
      channelId: string;
    },
    thumbnails: {
      default?: { url: string };
      medium?: { url: string };
      high?: { url: string };
    };
  };
}
