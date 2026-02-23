import axios from 'axios';
import * as cheerio from 'cheerio';
import type { ScrapedPost, ProfileResult } from './types.js';

const INSTAGRAM_BASE_URL = 'https://www.instagram.com';

const HTTP_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5',
};

function extractPostsFromHtml(
  html: string,
  maxPosts: number
): ScrapedPost[] {
  const $ = cheerio.load(html);
  const posts: ScrapedPost[] = [];

  $('script[type="application/ld+json"]').each((_index, element) => {
    try {
      const json = JSON.parse($(element).text());
      if (json?.mainEntity?.['@type'] === 'ProfilePage') {
        const author = json.mainEntity;
        const items = author?.mainEntityOfPage ?? [];

        for (const item of items) {
          if (posts.length >= maxPosts) break;

          const imageUrl: string = item.image?.[0]?.url ?? item.url ?? '';
          const shortcode: string = item.identifier?.value ?? '';

          if (imageUrl) {
            posts.push({
              imageUrl,
              alt: item.articleBody ?? '',
              shortcode,
              postUrl: item.url ?? `${INSTAGRAM_BASE_URL}/p/${shortcode}/`,
            });
          }
        }
      }
    } catch {
      // skip malformed json
    }
  });

  if (posts.length > 0) return posts;

  $('article img').each((_index, element) => {
    if (posts.length >= maxPosts) return false;
    const src = $(element).attr('src');
    const alt = $(element).attr('alt') ?? '';

    if (src) {
      posts.push({
        imageUrl: src,
        alt,
        shortcode: '',
        postUrl: '',
      });
    }
  });

  return posts;
}

export async function scrapeProfile(
  username: string,
  maxPosts: number
): Promise<ProfileResult> {
  const profileUrl = `${INSTAGRAM_BASE_URL}/${username}/`;

  try {
    const response = await axios.get<string>(profileUrl, {
      headers: HTTP_HEADERS,
      timeout: 10000,
    });

    const posts = extractPostsFromHtml(response.data, maxPosts);

    return { username, posts };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown error';
    return { username, posts: [], error: message };
  }
}

export async function scrapeProfiles(
  usernames: string[],
  maxPosts: number
): Promise<ProfileResult[]> {
  const results = await Promise.allSettled(
    usernames.map((username) => scrapeProfile(username.trim(), maxPosts))
  );

  return results.map((result, index) => {
    if (result.status === 'fulfilled') return result.value;
    return {
      username: usernames[index] ?? 'unknown',
      posts: [],
      error: result.reason instanceof Error ? result.reason.message : 'Unknown error',
    };
  });
}
