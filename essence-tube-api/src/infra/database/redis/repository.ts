import { RedisClientType } from 'redis';
import { connectRedis } from './connection.js';

export class RedisRepository<T> {
  private readonly prefix: string;
  private client: RedisClientType | null = null;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  private async getClient(): Promise<RedisClientType> {
    if (!this.client) {
      this.client = await connectRedis();
    }

    return this.client;
  }

  private getKey(id: string): string {
    return `${this.prefix}:${id}`;
  }

  async findOne(id: string): Promise<T | null> {
    const client = await this.getClient();
    const data = await client.get(this.getKey(id));
    return data ? (JSON.parse(data) as T) : null;
  }

  async create(id: string, value: T): Promise<void> {
    const client = await this.getClient();
    await client.set(this.getKey(id), JSON.stringify(value));
  }

  async update(id: string, value: Partial<T>): Promise<void> {
    const client = await this.getClient();
    const existing = await this.findOne(id);
    if (!existing) throw new Error('Entity not found');
    const updated = { ...existing, ...value };
    await client.set(this.getKey(id), JSON.stringify(updated));
  }

  async delete(id: string): Promise<void> {
    const client = await this.getClient();
    await client.del(this.getKey(id));
  }

  async findAll(): Promise<T[]> {
    const client = await this.getClient();
    const keys = await client.keys(`${this.prefix}:*`);
    if (!keys.length) return [];
    const values = await client.mGet(keys);
    return values
      .filter((v): v is string => v !== null)
      .map((v) => JSON.parse(v) as T);
  }
}
