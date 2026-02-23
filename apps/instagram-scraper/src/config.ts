import 'dotenv/config';

const DEFAULT_PORT = 3100;
const DEFAULT_MAX_POSTS = 3;

export const config = {
  port: Number(process.env.INSTAGRAM_SCRAPER_PORT ?? DEFAULT_PORT),
  maxPosts: Number(process.env.MAX_POSTS ?? DEFAULT_MAX_POSTS),
  profiles: (process.env.INSTAGRAM_PROFILES ?? '').split(',').filter(Boolean),
};
