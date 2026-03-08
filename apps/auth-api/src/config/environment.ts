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
  JWT_SECRET,
  JWT_EXPIRES_IN,
  DATABASE_PATH,
  DATABASE_MIGRATIONS_FOLDER,
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
  auth: {
    jwtSecret: string;
    jwtExpiresIn: string;
  };
  database: {
    path: string;
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
  auth: {
    jwtSecret: JWT_SECRET || "secret",
    jwtExpiresIn: JWT_EXPIRES_IN || "3600",
  },
  database: {
    path: DATABASE_PATH || "./auth.db",
    migrationsFolder:
      DATABASE_MIGRATIONS_FOLDER || "./src/database/migrations",
  },
  services: {
    resend: {
      apiKey: RESEND_API_KEY || "",
      fromEmail: RESEND_FROM_EMAIL || "noreply@example.com",
    },
  },
};
