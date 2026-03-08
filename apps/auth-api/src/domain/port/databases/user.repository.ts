import { User } from "../../entities/user.entity.js";

export interface UserRepository {
  findByEmail(email: string): User | null;
  findByProvider(provider: string, providerId: string): User | null;
  save(user: User): User;
}
