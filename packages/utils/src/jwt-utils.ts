import jwt, { type SignOptions } from "jsonwebtoken";

export interface JwtPayload {
  uuid: string;
  email?: string;
  type?: string;
  [key: string]: unknown;
}

export class JwtService {
  constructor(
    private readonly privateKey: string,
    private readonly publicKey: string,
    private readonly accessTokenExpiresIn: SignOptions["expiresIn"] = "1h",
    private readonly refreshTokenExpiresIn: SignOptions["expiresIn"] = "30d",
  ) {}

  signAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.privateKey, {
      algorithm: "RS256",
      expiresIn: this.accessTokenExpiresIn,
    });
  }

  signRefreshToken(payload: JwtPayload): string {
    return jwt.sign(
      { uuid: payload.uuid, email: payload.email, type: "refresh" },
      this.privateKey,
      {
        algorithm: "RS256",
        expiresIn: this.refreshTokenExpiresIn,
      },
    );
  }

  verify(token: string): JwtPayload {
    return jwt.verify(token, this.publicKey, {
      algorithms: ["RS256"],
    }) as JwtPayload;
  }
}
