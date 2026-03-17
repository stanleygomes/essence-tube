import { randomInt } from "crypto";
import Mustache from "mustache";

export const generateVerificationCode = (codeLength: number): string =>
  randomInt(0, 10 ** codeLength)
    .toString()
    .padStart(codeLength, "0");

export const buildVerificationCodeEmailHtml = (
  template: string,
  code: string,
  expiresInMinutes: number,
  platformUrl: string,
): string =>
  Mustache.render(template, {
    CODE: code,
    EXPIRY_MINUTES: String(expiresInMinutes),
    PLATFORM_URL: platformUrl,
  });
