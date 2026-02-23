export interface ScrapedPost {
  imageUrl: string;
  alt: string;
  shortcode: string;
  postUrl: string;
}

export interface ProfileResult {
  username: string;
  posts: ScrapedPost[];
  error?: string;
}
