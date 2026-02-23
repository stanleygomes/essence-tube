export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnails: {
    default: string;
    medium: string;
    high: string;
    maxres: string;
  };
  videoPublishedAt: string;
  channelId: string;
  channelTitle: string;
}

export interface PlaylistItem {
  id: string;
  videoId: string;
  title: string;
  description: string;
  thumbnails: {
    default: string;
    medium: string;
    high: string;
    maxres: string;
  };
  owner: {
    id: string;
    title: string;
  };
  videoPublishedAt: string;
}

export interface VideoMetadata {
  id: string;
  title: string;
  description: string;
  statistics: Record<string, any>;
  contentDetails: Record<string, any>;
  thumbnails: {
    default: string;
    medium: string;
    high: string;
    maxres: string;
  };
}

export interface LatestVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnails: {
    default: string;
    medium: string;
    high: string;
    maxres: string;
  };
  channelId: string;
  channelTitle: string;
}
