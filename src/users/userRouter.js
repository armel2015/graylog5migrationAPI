import { transfertUsersSchema, setUserPermissionSchema } from './userSchema.js';
import { transfertUsersPermissionsConf, transfertUsersConf } from './userController.js';
import config from '../config.js';

export const setUserPermissionsToStreams = async (fastify, options, done) => {
  fastify.get(`/${config.api.namespace}/${config.api.version}/userPermissionsTransfert`, { schema: setUserPermissionSchema },
    async (request, reply) => {
      await reply.send(await transfertUsersPermissionsConf());
    });
};

export const transfertUsersRouter = async (fastify, options, done) => {
  fastify.get(`/${config.api.namespace}/${config.api.version}/usersTransfert`, { schema: transfertUsersSchema },
    async (request, reply) => {
      await reply.send(await transfertUsersConf());
    });
};
