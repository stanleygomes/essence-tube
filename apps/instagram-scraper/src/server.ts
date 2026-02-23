import Fastify from 'fastify';
import { config } from './config.js';
import { scrapeProfiles } from './scraper.js';
import type { ProfileResult } from './types.js';

const fastify = Fastify({ logger: true });

fastify.get('/health', async () => {
  return { status: 'ok' };
});

fastify.get<{
  Querystring: { profiles?: string; max?: string };
}>('/scrape', async (request, reply) => {
  const queryProfiles = request.query.profiles;
  const maxPosts = Number(request.query.max ?? config.maxPosts);

  const usernames = queryProfiles
    ? queryProfiles.split(',').filter(Boolean)
    : config.profiles;

  if (usernames.length === 0) {
    return reply.status(400).send({
      error:
        'No profiles provided. Use ?profiles=user1,user2 or set INSTAGRAM_PROFILES env var.',
    });
  }

  const results: ProfileResult[] = await scrapeProfiles(usernames, maxPosts);

  return { results };
});

async function start() {
  try {
    await fastify.listen({ port: config.port, host: '0.0.0.0' });
    fastify.log.info(`Instagram scraper running on port ${config.port}`);
    fastify.log.info(`GET /scrape?profiles=user1,user2&max=3`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
