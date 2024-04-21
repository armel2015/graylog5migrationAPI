import { responseSchema } from '../eventDefinitions/eventDefSchema.js';
import { transfertEventsDefinitionsConf } from '../eventDefinitions/eventDefController.js';
import config from '../config.js';

export async function eventDefinitionMigrationRouter (fastify, options, done) {
  fastify.get(`/${config.api.namespace}/${config.api.version}/eventdefinitionsTransfert`, { schema: responseSchema },
    async (request, reply) => {
      await reply.send(transfertEventsDefinitionsConf());
    });
};
