import { User } from "../../entities/user.entity.js";

export interface AuthService {
  generateToken(user: User): string;
}
