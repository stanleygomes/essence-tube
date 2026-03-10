import { JwtService } from "@logos/utils";
import type { SignOptions } from "jsonwebtoken";
import { config } from "../config/environment.js";
import { UserRepository } from "../repositories/user.repository.js";
import { VerificationCodeRepository } from "../repositories/verification-code.repository.js";
import { EmailService } from "../services/email.service.js";
import { SendEmailCodeService } from "../services/send-email-code.service.js";
import { VerifyEmailCodeService } from "../services/verify-email-code.service.js";
import { RefreshTokenService } from "../services/refresh-token.service.js";
import { AuthController } from "../controllers/auth/auth.controller.js";

const userRepository = new UserRepository();
const verificationCodeRepository = new VerificationCodeRepository();
const emailService = new EmailService();
const jwtService = new JwtService(
  config.auth.jwtPrivateKey,
  config.auth.jwtPublicKey,
  config.auth.accessTokenExpiresIn as SignOptions["expiresIn"],
  config.auth.refreshTokenExpiresIn as SignOptions["expiresIn"],
);

const sendEmailCodeService = new SendEmailCodeService(
  verificationCodeRepository,
  emailService,
);

const verifyEmailCodeService = new VerifyEmailCodeService(
  verificationCodeRepository,
  userRepository,
  jwtService,
);

const refreshTokenService = new RefreshTokenService(jwtService);

export const authController = new AuthController(
  sendEmailCodeService,
  verifyEmailCodeService,
  refreshTokenService,
);
