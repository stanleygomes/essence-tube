export const getVideoSchema = {
  description: 'Busca dados de um vídeo',
  tags: ['Video'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', description: 'ID do vídeo' }
    },
    required: ['id']
  },
  response: {
    200: {
      description: 'Dados do vídeo',
      type: 'object'
    }
  }
};

