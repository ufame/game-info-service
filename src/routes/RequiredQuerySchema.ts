export const requiredQuerySchema = {
  querystring: {
    type: 'object',
    properties: {
      type: { type: 'string' },
      host: { type: 'string' }
    },
    required: ['type', 'host']
  }
};