export const downloadSchema = {
  description: "Download a YouTube video or playlist",
  tags: ["Download"],
  body: {
    type: "object",
    required: ["url", "format"],
    properties: {
      url: { type: "string", description: "YouTube video or playlist URL" },
      format: {
        type: "string",
        enum: ["mp3", "mp4"],
        description: "Output format",
      },
    },
  },
  response: {
    200: {
      description: "File stream returned as download",
      type: "string",
    },
    400: {
      description: "Invalid URL or parameters",
      type: "object",
      properties: { message: { type: "string" } },
    },
    404: {
      description: "Video or playlist not found",
      type: "object",
      properties: { message: { type: "string" } },
    },
  },
};
