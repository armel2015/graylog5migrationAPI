import { transfertViewsConf } from '../views/viewController.js';
import { responseSchema } from '../views/viewSchema.js';
import config from '../config.js';

export const viewTransferRouter = async (fastify, options, done) => {
  fastify.get(`/${config.api.namespace}/${config.api.version}/views`, { schema: responseSchema },
    async (request, reply) => {
      await reply.send(await transfertViewsConf());
    });
};
