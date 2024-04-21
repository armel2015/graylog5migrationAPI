import { responseSchema } from '../indexes/indexSchema.js';
import { transfertIndexSetConf } from '../indexes/indexController.js';
import config from '../config.js';

export async function indexesMigrationRouter (fastify, options, done) {
  fastify.get(`/${config.api.namespace}/${config.api.version}/indexesTransfert`, { schema: responseSchema },
    async (request, reply) => {
      await reply.send(await transfertIndexSetConf());
    });
};
