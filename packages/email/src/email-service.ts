import { httpClient } from "@logos/http";
import { Logger } from "@logos/logger";

interface EmailResponse {
  id: string;
}

export class EmailService {
  private logger = Logger.getLogger({ level: "error" }, "email-service");
  private readonly baseUrl = "https://api.resend.com";

  constructor(
    private readonly apiKey: string,
    private readonly fromEmail: string,
  ) {}

  async sendVerificationCode(
    subject: string,
    email: string,
    html?: string,
  ): Promise<EmailResponse> {
    try {
      const response = await httpClient.post<EmailResponse>(
        `${this.baseUrl}/emails`,
        {
          from: this.fromEmail,
          to: [email],
          subject,
          html,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        },
      );

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Unknown error";
      const statusCode = error.response?.status;

      this.logger.error(
        { err: error.response?.data || error, status: statusCode },
        `Failed to send email: ${errorMessage}`,
      );

      throw new Error(`Failed to send email: ${errorMessage}`);
    }
  }
}
