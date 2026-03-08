const {
  APP_PUBLIC_BASE_URL,
  APP_CORS_ORIGIN,
  NODE_ENV,
  SERVER_URL,
  SERVER_PATH,
  SERVER_PORT,
  SWAGGER_PATH,
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
};
