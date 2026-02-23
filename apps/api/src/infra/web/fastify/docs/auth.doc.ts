export const loginWithGoogleSchema = {
  description: "Login with Google",
  tags: ["Auth"],
  response: {
    302: {
      description: "Redirect to Google OAuth",
      type: "null",
    },
  },
};

export const oauthCallbackSchema = {
  description: "Callback do OAuth do Google",
  tags: ["Auth"],
  response: {
    200: {
      description: "Código de autorização recebido",
      type: "object",
    },
  },
};
