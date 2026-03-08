const {
  APP_PUBLIC_BASE_URL,
  APP_CORS_ORIGIN,
  NODE_ENV,
  SERVER_URL,
  SERVER_PATH,
  SERVER_PORT,
  SWAGGER_PATH,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  SQLITE_PATH,
  EMAIL_SMTP_HOST,
  EMAIL_SMTP_PORT,
  EMAIL_SMTP_USER,
  EMAIL_SMTP_PASS,
  EMAIL_FROM,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_REDIRECT_URI,
  APPLE_CLIENT_ID,
  APPLE_TEAM_ID,
  APPLE_KEY_ID,
  APPLE_PRIVATE_KEY,
  APPLE_REDIRECT_URI,
} = process.env;

export const config = {
  app: {
    server: { url: SERVER_URL, path: SERVER_PATH, port: SERVER_PORT },
    docs: { path: SWAGGER_PATH || "/docs" },
    web: { baseUrl: APP_PUBLIC_BASE_URL || "http://localhost:3000" },
    cors: {
      allowedOrigin: APP_CORS_ORIGIN || "*",
      allowedMethods: "GET,POST,PUT,DELETE,OPTIONS",
      allowedHeaders: "Content-Type,Authorization",
    },
    env: NODE_ENV,
  },
  auth: {
    jwtSecret: JWT_SECRET || (NODE_ENV === "production" ? (() => { throw new Error("JWT_SECRET is required"); })() : "dev-secret"),
    jwtExpiresInSeconds: Number(JWT_EXPIRES_IN) || 86400,
  },
  database: {
    sqlitePath: SQLITE_PATH || "./auth.db",
  },
  email: {
    from: EMAIL_FROM || "noreply@example.com",
    smtp: {
      host: EMAIL_SMTP_HOST || "",
      port: Number(EMAIL_SMTP_PORT) || 587,
      auth: { user: EMAIL_SMTP_USER || "", pass: EMAIL_SMTP_PASS || "" },
    },
  },
  oauth: {
    google: {
      clientId: GOOGLE_CLIENT_ID || "",
      clientSecret: GOOGLE_CLIENT_SECRET || "",
      redirectUri: GOOGLE_REDIRECT_URI || "",
    },
    github: {
      clientId: GITHUB_CLIENT_ID || "",
      clientSecret: GITHUB_CLIENT_SECRET || "",
      redirectUri: GITHUB_REDIRECT_URI || "",
    },
    apple: {
      clientId: APPLE_CLIENT_ID || "",
      teamId: APPLE_TEAM_ID || "",
      keyId: APPLE_KEY_ID || "",
      privateKey: (APPLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
      redirectUri: APPLE_REDIRECT_URI || "",
    },
  },
};
