import fastify from 'fastify';

import config from './config.js';
import healthRouter from './plugins/health.js';
import openapi from './plugins/openapi.js';

import { indexesMigrationRouter } from './indexes/indexRouter.js';
import { inputsMigrationRouter } from './inputs/inputRouter.js';
import { streamsMigrationRouter } from './streams/streamRouter.js';
import { notificationsMigrationRouter } from './notifications/notifRouter.js';
import { eventDefinitionMigrationRouter } from './eventDefinitions/eventDefRouter.js';
import { transfertUsersRouter, setUserPermissionsToStreams } from './users/userRouter.js';

const app = fastify();

if (config.env !== 'prd') {
  // Keep this one in first position, before plugins and routers.
  await app.register(openapi);
}

// await app.register(tracing);
await app.register(healthRouter);

await app.register(indexesMigrationRouter);
await app.register(inputsMigrationRouter);
await app.register(streamsMigrationRouter);
await app.register(notificationsMigrationRouter);
await app.register(eventDefinitionMigrationRouter);
await app.register(transfertUsersRouter);
await app.register(setUserPermissionsToStreams);

export default app;
