const {
  NEXT_PUBLIC_API_URL,
} = process.env;

export const config = {
  api: {
    baseUrl: NEXT_PUBLIC_API_URL,
  },
};
