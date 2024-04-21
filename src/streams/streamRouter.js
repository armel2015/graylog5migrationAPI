import { responseSchema } from '../streams/streamSchema.js';
import { transfertStreamsConf } from '../streams/streamController.js';
import config from '../config.js';

export const streamsMigrationRouter = async (fastify, options, done) => {
  fastify.get(`/${config.api.namespace}/${config.api.version}/streamsTransfert`, { schema: responseSchema },
    async (request, reply) => {
      await reply.send(await transfertStreamsConf());
    });
};
