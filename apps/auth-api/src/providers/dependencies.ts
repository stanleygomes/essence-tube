import { JwtService } from "@repo/utils";
import type { SignOptions } from "jsonwebtoken";
import { config } from "../config/environment.js";
import { UserRepository } from "../repositories/user.repository.js";
import { VerificationCodeRepository } from "../repositories/verification-code.repository.js";
import { EmailService } from "../services/email.service.js";
import { SendEmailCodeUseCase } from "../usecases/send-email-code.usecase.js";
import { VerifyEmailCodeUseCase } from "../usecases/verify-email-code.usecase.js";
import { RefreshTokenUseCase } from "../usecases/refresh-token.usecase.js";
import { AuthController } from "../controllers/auth.controller.js";

const userRepository = new UserRepository();
const verificationCodeRepository = new VerificationCodeRepository();
const emailService = new EmailService();
const jwtService = new JwtService(
  config.auth.jwtPrivateKey,
  config.auth.jwtPublicKey,
  config.auth.accessTokenExpiresIn as SignOptions["expiresIn"],
  config.auth.refreshTokenExpiresIn as SignOptions["expiresIn"],
);

const sendEmailCodeUseCase = new SendEmailCodeUseCase(
  verificationCodeRepository,
  emailService,
);

const verifyEmailCodeUseCase = new VerifyEmailCodeUseCase(
  verificationCodeRepository,
  userRepository,
  jwtService,
);

const refreshTokenUseCase = new RefreshTokenUseCase(jwtService);

export const authController = new AuthController(
  sendEmailCodeUseCase,
  verifyEmailCodeUseCase,
  refreshTokenUseCase,
);
