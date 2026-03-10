export const oauthTokenSchema = {
  description: "OAuth 2.0 token endpoint — client credentials grant",
  tags: ["OAuth"],
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

export const registerOAuthClientSchema = {
  description: "Register a new OAuth client application",
  tags: ["OAuth"],
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
