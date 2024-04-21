import crypto from 'node:crypto';
import { fastifyRequestContext, requestContext } from '@fastify/request-context';
import fp from 'fastify-plugin';
import logger from '../utils/logger.js';
import Fastify from 'fastify';

const fastify = Fastify();

export default fp(async function () {
  await fastify.register(fastifyRequestContext);

  fastify.addHook('onRequest', (request, reply, done) => {
    const timetstampBefore = Date.now();
    const requestId = crypto.randomUUID();
    const traceId = request.headers['trace-id'] === 'string' ? request.headers['trace-id'] : requestId;

    requestContext.set('timestamp', timetstampBefore);
    requestContext.set('requestId', requestId);
    requestContext.set('requestMethod', request.method);
    requestContext.set('requestPath', request.url);
    requestContext.set('traceId', traceId);
    reply.header('trace-id', traceId);
    done();
  });

  fastify.addHook('onResponse', (request, reply, done) => {
    const startTimestamp = requestContext.get('timestamp');
    let message;

    if (startTimestamp === undefined) {
      message = `Request on '${request.routeOptions.url ?? request.url}' done with status ${reply.statusCode}.`;
    } else {
      message = `Request on '${request.routeOptions.url ?? request.url}' done in ${Date.now() - startTimestamp}ms with status ${reply.statusCode}.`;
    }
    logger.info(message);
    done();
  });
});
