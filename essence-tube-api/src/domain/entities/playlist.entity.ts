export interface Playlist {
  id: string;
  title: string;
  description: string;
  thumbnails: {
    default: string;
    medium: string;
    high: string;
    maxres: string;
  };
}
