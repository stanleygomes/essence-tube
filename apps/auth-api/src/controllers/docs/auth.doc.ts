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
  description: "Verify email code and get token",
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
      },
    },
  },
};
