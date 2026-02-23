import { User } from '../../entities/user.entity.js';

export interface UserRepository {
  getUserByUUID(uuid: string): Promise<User | null>;
  getUserByPartnerId(partnerId: string): Promise<User | null>;
  createUser(user: User): Promise<User>;
  updateUserByUUID(user: User, uuid: string): Promise<User>;
}
