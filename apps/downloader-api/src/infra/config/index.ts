const {
  APP_CORS_ORIGIN,
  NODE_ENV,
  SERVER_URL,
  SERVER_PATH,
  SERVER_PORT,
  SWAGGER_PATH,
  SQLITE_DB_PATH,
} = process.env;

export interface Config {
  app: {
    server: {
      url?: string;
      path?: string;
      port?: string;
    };
    docs: {
      path?: string;
    };
    cors: {
      allowedOrigin: string;
    };
    env?: string;
  };
  database: {
    sqlite: {
      path: string;
    };
  };
}

export const config: Config = {
  app: {
    server: {
      url: SERVER_URL,
      path: SERVER_PATH,
      port: SERVER_PORT,
    },
    docs: {
      path: SWAGGER_PATH,
    },
    cors: {
      allowedOrigin: APP_CORS_ORIGIN || "http://localhost:3001",
    },
    env: NODE_ENV,
  },
  database: {
    sqlite: {
      path: SQLITE_DB_PATH || "download-history.db",
    },
  },
};
