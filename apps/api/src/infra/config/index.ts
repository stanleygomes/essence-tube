const {
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
  GOOGLE_OAUTH_REDIRECT_URI,
  APP_PUBLIC_BASE_URL,
  MONGODB_URI,
  MONGODB_DATABASE,
  APP_CORS_ORIGIN,
  NODE_ENV,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  SERVER_URL,
  SERVER_PATH,
  SERVER_PORT,
  SWAGGER_PATH,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  TURSO_DATABASE_URL,
  TURSO_AUTH_TOKEN,
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
  databases: {
    mongodb: {
      uri?: string;
      dbName?: string;
    };
    redis: {
      host?: string;
      port?: string;
      password?: string;
    };
    turso: {
      url?: string;
      authToken?: string;
    };
  };
  auth: {
    jwtSecret?: string;
    jwtExpiresInSeconds?: string;
  };
  services: {
    googleAuth: {
      baseUrl: string;
      clientId?: string;
      clientSecret?: string;
      redirectUri?: string;
      scope: string;
    };
    googleAccount: {
      baseUrl: string;
    };
    youtube: {
      apiBaseUrl: string;
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
  databases: {
    mongodb: {
      uri: MONGODB_URI,
      dbName: MONGODB_DATABASE,
    },
    redis: {
      host: REDIS_HOST,
      port: REDIS_PORT,
      password: REDIS_PASSWORD,
    },
    turso: {
      url: TURSO_DATABASE_URL,
      authToken: TURSO_AUTH_TOKEN,
    },
  },
  auth: {
    jwtSecret: JWT_SECRET,
    jwtExpiresInSeconds: JWT_EXPIRES_IN || "3600",
  },
  services: {
    googleAuth: {
      baseUrl: "https://oauth2.googleapis.com/token",
      clientId: GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
      redirectUri: GOOGLE_OAUTH_REDIRECT_URI,
      scope: "openid email profile https://www.googleapis.com/auth/youtube",
    },
    googleAccount: {
      baseUrl: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    youtube: {
      apiBaseUrl: "https://www.googleapis.com/youtube/v3",
    },
  },
};
