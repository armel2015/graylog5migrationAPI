import app from './app.js';
import logger from './utils/logger.js';

try {
  const address = await app.listen({ port: 4000, host: '0.0.0.0' });
  const modeSuffix = process.env.NODE_ENV !== undefined ? ` in mode [${process.env.NODE_ENV}]` : '';
  logger.info(`Server listening at [${address}]${modeSuffix}`);
} catch (err) {
  if (err !== null && err !== undefined) {
    logger.error(`Error when starting the HTTP server: ${err.message}`);
    process.exit(1);
  }
}
