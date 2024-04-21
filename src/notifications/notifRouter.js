import { responseSchema } from '../notifications/notifSchema.js';
import { transfertEventsNotificationsConf } from '../notifications/notifController.js';
import config from '../config.js';

export const notificationsMigrationRouter = async (fastify, options, done) => {
  fastify.get(`/${config.api.namespace}/${config.api.version}/notificationsTransfert`, { schema: responseSchema },
    async (request, reply) => {
      await reply.send(await transfertEventsNotificationsConf());
    });
};
