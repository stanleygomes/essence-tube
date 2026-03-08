import { getDb } from "../database/sqlite/connection.js";
import { SqliteUserRepository } from "../database/sqlite/repositories/user.repository.js";
import { SqliteVerificationCodeRepository } from "../database/sqlite/repositories/verification-code.repository.js";
import { JwtService } from "../auth/jwt.js";
import { NodemailerEmailService } from "../services/email/email.service.js";
import { GoogleOAuthService } from "../services/google/google-oauth.service.js";
import { GithubOAuthService } from "../services/github/github-oauth.service.js";
import { AppleOAuthService } from "../services/apple/apple-oauth.service.js";
import { SendEmailCodeUseCase } from "../../application/usecases/send-email-code.js";
import { VerifyEmailCodeUseCase } from "../../application/usecases/verify-email-code.js";
import { GetOAuthUrlUseCase } from "../../application/usecases/get-oauth-url.js";
import { OAuthCallbackUseCase } from "../../application/usecases/oauth-callback.js";

getDb();

const userRepository = new SqliteUserRepository();
const verificationCodeRepository = new SqliteVerificationCodeRepository();
const jwtService = new JwtService();
const emailService = new NodemailerEmailService();
const googleOAuthService = new GoogleOAuthService();
const githubOAuthService = new GithubOAuthService();
const appleOAuthService = new AppleOAuthService();

const sendEmailCodeUseCase = new SendEmailCodeUseCase(verificationCodeRepository, emailService);
const verifyEmailCodeUseCase = new VerifyEmailCodeUseCase(verificationCodeRepository, userRepository, jwtService);
const getGoogleUrlUseCase = new GetOAuthUrlUseCase(googleOAuthService);
const getGithubUrlUseCase = new GetOAuthUrlUseCase(githubOAuthService);
const getAppleUrlUseCase = new GetOAuthUrlUseCase(appleOAuthService);
const googleCallbackUseCase = new OAuthCallbackUseCase(googleOAuthService, userRepository, jwtService, "google");
const githubCallbackUseCase = new OAuthCallbackUseCase(githubOAuthService, userRepository, jwtService, "github");
const appleCallbackUseCase = new OAuthCallbackUseCase(appleOAuthService, userRepository, jwtService, "apple");

export {
  sendEmailCodeUseCase,
  verifyEmailCodeUseCase,
  getGoogleUrlUseCase,
  getGithubUrlUseCase,
  getAppleUrlUseCase,
  googleCallbackUseCase,
  githubCallbackUseCase,
  appleCallbackUseCase,
};
