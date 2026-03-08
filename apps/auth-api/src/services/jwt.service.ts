import jwt from "jsonwebtoken";
import { config } from "../config/environment.js";

export class JwtService {
  sign(payload: object): string {
    return jwt.sign(payload, config.auth.jwtSecret, {
      expiresIn: config.auth.jwtExpiresIn as any,
    });
  }

  verify(token: string): object {
    return jwt.verify(token, config.auth.jwtSecret) as object;
  }
}
