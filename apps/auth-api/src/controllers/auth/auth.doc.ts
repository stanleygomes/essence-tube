export const sendCodeSchema = {
  description: "Send verification code to email",
  tags: ["Auth"],
  body: {
    type: "object",
    required: ["email"],
    properties: {
      email: { type: "string", format: "email" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

export const verifyCodeSchema = {
  description: "Verify email code and get tokens",
  tags: ["Auth"],
  body: {
    type: "object",
    required: ["email", "code"],
    properties: {
      email: { type: "string", format: "email" },
      code: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        token: { type: "string" },
        refreshToken: { type: "string" },
      },
    },
  },
};

export const refreshTokenSchema = {
  description: "Refresh access token using refresh token",
  tags: ["Auth"],
  body: {
    type: "object",
    required: ["refreshToken"],
    properties: {
      refreshToken: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        token: { type: "string" },
      },
    },
  },
};

export const tokenSchema = {
  description: "OAuth 2.0 client credentials grant — exchange client_id and client_secret for an access token",
  tags: ["Auth"],
  body: {
    type: "object",
    required: ["grant_type", "client_id", "client_secret"],
    properties: {
      grant_type: { type: "string", enum: ["client_credentials"] },
      client_id: { type: "string" },
      client_secret: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        access_token: { type: "string" },
        token_type: { type: "string" },
        expires_in: { type: "number" },
      },
    },
  },
};

export const createClientSchema = {
  description: "Create a new OAuth API client — returns client_id and client_secret (shown once)",
  tags: ["Auth"],
  body: {
    type: "object",
    required: ["name"],
    properties: {
      name: { type: "string" },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        client_id: { type: "string" },
        client_secret: { type: "string" },
      },
    },
  },
};

