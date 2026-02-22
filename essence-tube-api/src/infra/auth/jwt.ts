import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import { AuthInfo } from '../../domain/entities/auth-info.entity.js';
import { AuthError } from '../../domain/errors/AuthError.js';
import { AuthService } from '../../domain/port/auth/auth.service.js';

const { jwtSecret, jwtExpiresInSeconds } = config.auth;

interface Payload {
  uuid: string;
  name: string;
  email: string;
  photo_url: string;
}

export class JwtService implements AuthService {
  generateToken(authInfo: AuthInfo, userUUID: string): string {
    if (!jwtSecret) {
      throw new AuthError('JWT Secret is not defined');
    }

    if (!jwtExpiresInSeconds) {
      throw new AuthError('JWT Expiration is not defined');
    }

    if (typeof authInfo !== 'object' || authInfo === null) {
      throw new AuthError('Auth info must be a non-null object');
    }

    const payload = this.buildPayload(authInfo, userUUID);
    return jwt.sign(payload, jwtSecret, { expiresIn: Number(jwtExpiresInSeconds) });
  }

  verifyToken(token: string): any {
    if (!jwtSecret){
      throw new AuthError('JWT Secret is not defined');
    }

    return jwt.verify(token, jwtSecret);
  }

  refreshToken(token: string): string {
    if (!token) {
      throw new AuthError('Token is not defined');
    }

    try {
      const decoded = this.verifyToken(token);
      return this.generateToken(decoded as AuthInfo, decoded.uuid);
    } catch (error) {
      throw new AuthError('Invalid token or token expired');
    }
  }

  decodeTokenPayload(token: string): AuthInfo {
    return jwt.decode(token) as AuthInfo;
  }

  private buildPayload(authInfo: AuthInfo, userUUID: string): Payload {
    return {
      uuid: userUUID,
      name: authInfo.name,
      email: authInfo.email,
      photo_url: authInfo.photo_url,
    } as Payload
  }
}
