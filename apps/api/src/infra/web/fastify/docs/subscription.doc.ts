export const listSubscriptionsSchema = {
  description: 'Lista canais inscritos',
  tags: ['Subscription'],
  response: {
    200: {
      description: 'Lista de canais',
      type: 'array',
      items: { type: 'object' }
    }
  }
};

export const listLatestVideosFromChannelSchema = {
  description: 'Lista últimos vídeos de um canal',
  tags: ['Subscription'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', description: 'ID do canal' }
    },
    required: ['id']
  },
  response: {
    200: {
      description: 'Lista de vídeos',
      type: 'array',
      items: { type: 'object' }
    }
  }
};

