const errorBaseSchema = {
  status: {
    type: 'number'
  },
  code: {
    type: 'string'
  },
  error: {
    type: 'string'
  },
  message: {
    type: 'string'
  }
};

export const schema400 = {
  400: {
    description: 'Bad request',
    type: 'object',
    properties: errorBaseSchema,
    examples: [
      {
        status: 400,
        code: 'FST_ERR_VALIDATION',
        error: 'Error',
        message: 'Failed to read flights availability data'
      }
    ]
  }
};

export const schema404 = {
  404: {
    description: 'Resource not found',
    type: 'object',
    properties: errorBaseSchema,
    examples: [
      {
        status: 404,
        code: 'HTTP_NOT_FOUND',
        error: 'Not found',
        message: 'Route [GET:/foo/bar] not found.'
      }
    ]
  }
};

export const datetimeRegex = '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$';
