import jwt from "jsonwebtoken";
import { config } from "../../config/environment.js";
import { AuthError } from "../../errors/AuthError.js";
import { User } from "../../domain/entities/user.entity.js";
import { AuthService } from "../../domain/port/services/auth.service.js";

export class JwtService implements AuthService {
  generateToken(user: User): string {
    const { jwtSecret, jwtExpiresInSeconds } = config.auth;

    if (!jwtSecret) {
      throw new AuthError("JWT Secret is not defined");
    }

    return jwt.sign(
      { uuid: user.id, name: user.name, email: user.email, photo_url: user.photo_url },
      jwtSecret,
      { expiresIn: jwtExpiresInSeconds },
    );
  }

  verifyToken(token: string): unknown {
    const { jwtSecret } = config.auth;

    if (!jwtSecret) {
      throw new AuthError("JWT Secret is not defined");
    }

    return jwt.verify(token, jwtSecret);
  }
}
