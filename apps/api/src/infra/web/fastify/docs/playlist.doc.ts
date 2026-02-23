export const listPlaylistsSchema = {
  description: "Lista todas as playlists do usuário",
  tags: ["Playlist"],
  response: {
    200: {
      description: "Lista de playlists",
      type: "array",
      items: { type: "object" },
    },
  },
};

export const listVideosFromPlaylistSchema = {
  description: "Lista vídeos de uma playlist",
  tags: ["Playlist"],
  params: {
    type: "object",
    properties: {
      id: { type: "string", description: "ID da playlist" },
    },
    required: ["id"],
  },
  response: {
    200: {
      description: "Lista de vídeos",
      type: "array",
      items: { type: "object" },
    },
  },
};

export const addVideoToPlaylistSchema = {
  description: "Adiciona um vídeo a uma playlist",
  tags: ["Playlist"],
  querystring: {
    type: "object",
    properties: {
      playlistId: { type: "string" },
      videoId: { type: "string" },
    },
    required: ["playlistId", "videoId"],
  },
  response: {
    200: {
      description: "Vídeo adicionado",
      type: "object",
    },
  },
};

export const removeVideoFromPlaylistSchema = {
  description: "Remove um vídeo de uma playlist",
  tags: ["Playlist"],
  querystring: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  response: {
    200: {
      description: "Vídeo removido",
      type: "string",
    },
  },
};
