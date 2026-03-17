export const executePromptDoc = {
  body: {
    type: "object",
    required: ["prompt"],
    properties: {
      prompt: { type: "string", minLength: 1, maxLength: 5000 },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        response: { type: "string" },
        createdAt: { type: "string", format: "date-time" },
      },
    },
    401: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    423: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
  security: [{ bearerAuth: [] }],
};
