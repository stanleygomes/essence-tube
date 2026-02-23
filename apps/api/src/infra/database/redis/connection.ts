import { createClient, RedisClientType } from "redis";
import { config } from "../../config/index.js";

const { host, port, password } = config.databases.redis || {};

let client: RedisClientType | null = null;

export async function connectRedis(): Promise<RedisClientType> {
  if (client && client.isOpen) {
    return client;
  }

  if (!host || !port) {
    throw new Error("Redis host or port is not defined in config!");
  }

  client = createClient({
    socket: {
      host,
      port: Number(port),
      tls: true,
    },
    password: password || undefined,
  });

  client.on("error", (err) => {
    console.error("Redis Client Error", err);
  });

  await client.connect();
  return client;
}
