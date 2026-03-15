const {
  NODE_ENV,
  SERVER_URL,
  SERVER_PATH,
  SERVER_PORT,
  SWAGGER_PATH,
  JWT_PRIVATE_KEY,
  JWT_PUBLIC_KEY,
  GOOGLE_AI_STUDIO_API_KEY,
  GOOGLE_AI_STUDIO_MODEL,
  DATABASE_URL,
  DATABASE_AUTH_TOKEN,
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
    env?: string;
  };
  logger: {
    level: string;
    transport?: string;
  };
  auth: {
    jwtPrivateKey: string;
    jwtPublicKey: string;
  };
  services: {
    googleAiStudio: {
      apiKey: string;
      model: string;
    };
  };
  database: {
    url: string;
    authToken?: string;
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
    env: NODE_ENV,
  },
  logger: {
    level: LOG_LEVEL || "info",
    transport: LOG_TRANSPORT || "pino-pretty",
  },
  auth: {
    jwtPrivateKey: (JWT_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    jwtPublicKey: (JWT_PUBLIC_KEY || "").replace(/\\n/g, "\n"),
  },
  services: {
    googleAiStudio: {
      apiKey: GOOGLE_AI_STUDIO_API_KEY || "",
      model: GOOGLE_AI_STUDIO_MODEL || "gemini-2.0-flash",
    },
  },
  database: {
    url: DATABASE_URL || "file:./.docker/revelation.db",
    authToken: DATABASE_AUTH_TOKEN,
  },
};
