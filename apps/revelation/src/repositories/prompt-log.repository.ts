import { db } from "../config/database-client.js";
import { prompt_logs } from "../schemas/database/index.js";

interface SavePromptLogInput {
  userId: string;
  userEmail: string;
  prompt: string;
  response: string;
  createdAt: Date;
}

export class PromptLogRepository {
  async save(data: SavePromptLogInput) {
    await db.insert(prompt_logs).values({
      id: crypto.randomUUID(),
      user_id: data.userId,
      user_email: data.userEmail,
      prompt: data.prompt,
      response: data.response,
      created_at: data.createdAt,
    });
  }
}
