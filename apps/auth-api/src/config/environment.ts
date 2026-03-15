const {
  APP_PUBLIC_BASE_URL,
  APP_CORS_ORIGIN,
  NODE_ENV,
  SERVER_URL,
  SERVER_PATH,
  SERVER_PORT,
  SWAGGER_PATH,
  RESEND_API_KEY,
  RESEND_FROM_EMAIL,
  JWT_PRIVATE_KEY,
  JWT_PUBLIC_KEY,
  JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
  DATABASE_URL,
  DATABASE_MIGRATIONS_FOLDER,
  LOG_LEVEL,
  LOG_TRANSPORT,
} = process.env;

export interface Environment {
  app: {
    server: {
      url?: string;
      path?: string;
      port?: string;
    };
    docs: {
      path?: string;
    };
    web: {
      baseUrl?: string;
    };
    cors: {
      allowedOrigin: string;
      allowedMethods: string;
      allowedHeaders: string;
    };
    env?: string;
  };
  logger: {
    level: string;
    transport?: string;
  };
  auth: {
    jwtPrivateKey: string;
    jwtPublicKey: string;
    accessTokenExpiresIn: string;
    refreshTokenExpiresIn: string;
  };
  database: {
    url: string;
    migrationsFolder: string;
  };
  services: {
    resend: {
      apiKey: string;
      fromEmail: string;
    };
  };
}

export const config: Environment = {
  app: {
    server: {
      url: SERVER_URL,
      path: SERVER_PATH,
      port: SERVER_PORT,
    },
    docs: {
      path: SWAGGER_PATH,
    },
    web: {
      baseUrl: APP_PUBLIC_BASE_URL,
    },
    cors: {
      allowedOrigin: APP_CORS_ORIGIN || "*localhost*",
      allowedMethods: "GET,POST,PUT,DELETE,OPTIONS",
      allowedHeaders: "Content-Type,Authorization",
    },
    env: NODE_ENV,
  },
  logger: {
    level: LOG_LEVEL || "info",
    transport: LOG_TRANSPORT || "pino-pretty",
  },
  auth: {
    jwtPrivateKey: (JWT_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    jwtPublicKey: (JWT_PUBLIC_KEY || "").replace(/\\n/g, "\n"),
    accessTokenExpiresIn: JWT_ACCESS_EXPIRES_IN || "1h",
    refreshTokenExpiresIn: JWT_REFRESH_EXPIRES_IN || "30d",
  },
  database: {
    url: DATABASE_URL || "postgres://postgres:postgres@localhost:5432/auth_api",
    migrationsFolder: DATABASE_MIGRATIONS_FOLDER || "./src/database/migrations",
  },
  services: {
    resend: {
      apiKey: RESEND_API_KEY || "",
      fromEmail: RESEND_FROM_EMAIL || "noreply@example.com",
    },
  },
};
