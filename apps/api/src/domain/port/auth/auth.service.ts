import { AuthInfo } from "../../entities/auth-info.entity.js";

export interface AuthService {
  generateToken(auth: AuthInfo, userUUID: string): string;
  verifyToken(token: string): any;
  refreshToken(token: string): string
  decodeTokenPayload(token: string): AuthInfo
}
