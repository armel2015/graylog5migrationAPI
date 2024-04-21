import { version } from 'node:process';
import config from '../config.js';

const responseSchema = {
  summary: 'Health',
  description: 'Health check. It is supposed to always return 200. It provides some information on the status of the app.',
  tags: ['utils'],
  response: {
    200: {
      description: 'Application is healthy.',
      type: 'object',
      properties: {
        status: {
          description: 'Status of the application. It must be `pass`.',
          type: 'string'
        },
        id: {
          description: 'Unique identifier of the application.',
          type: 'string'
        },
        version: {
          description: 'Version of the application.',
          type: 'string'
        },
        env: {
          description: 'Environment in which the application is running.',
          type: 'string',
          pattern: '^tst|acc|prd|dev$'
        },
        nodeVersion: {
          description: 'Version of the Node runtime.',
          type: 'string'
        }
      },
      examples: [
        {
          status: 'pass',
          id: 'api.extranet',
          version: 'dev',
          env: 'dev',
          nodeVersion: 'v20.10.0'
        }
      ]
    },
    500: {
      description: 'Application has a problem.',
      type: 'null'
    }
  }
};

const healthRouter = async (fastify, options, done) => {
  fastify.get(`/${config.api.namespace}/${config.api.version}/health`, {
    schema: responseSchema
  }, async (request, reply) => {
    await reply.send({
      status: 'pass',
      id: config.app.identifier,
      version: config.app.version,
      env: config.env,
      nodeVersion: version
    });
  });
};

export default healthRouter;
