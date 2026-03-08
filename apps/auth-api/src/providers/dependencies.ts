import { UserRepository } from "../repositories/user.repository.js";
import { VerificationCodeRepository } from "../repositories/verification-code.repository.js";
import { EmailService } from "../services/email.service.js";
import { JwtService } from "../services/jwt.service.js";
import { SendEmailCodeUseCase } from "../usecases/send-email-code.usecase.js";
import { VerifyEmailCodeUseCase } from "../usecases/verify-email-code.usecase.js";
import { AuthController } from "../controllers/auth.controller.js";

const userRepository = new UserRepository();
const verificationCodeRepository = new VerificationCodeRepository();
const emailService = new EmailService();
const jwtService = new JwtService();

const sendEmailCodeUseCase = new SendEmailCodeUseCase(
  verificationCodeRepository,
  emailService,
);

const verifyEmailCodeUseCase = new VerifyEmailCodeUseCase(
  verificationCodeRepository,
  userRepository,
  jwtService,
);

export const authController = new AuthController(
  sendEmailCodeUseCase,
  verifyEmailCodeUseCase,
);
