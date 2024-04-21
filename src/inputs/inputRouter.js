import { responseSchema } from '../inputs/inputSchema.js';
import { transfertInputsConf } from '../inputs/inputController.js';
import config from '../config.js';

export async function inputsMigrationRouter (fastify, options, done) {
  fastify.get(`/${config.api.namespace}/${config.api.version}/inputsTransfert`, { schema: responseSchema },
    async (request, reply) => {
      await reply.send(await transfertInputsConf());
    });
};
