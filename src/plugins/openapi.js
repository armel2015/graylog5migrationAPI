import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fp from 'fastify-plugin';
import config from '../config.js';

export default fp(async function (fastify, options) {
  await fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Graylog API',
        description: ' GRaylog API',
        version: config.app.version ?? 'dev'
      },
      externalDocs: {
        url: 'https://gitlab.lu/continuousintegration/graylog',
        description: 'Git repository'
      },
      servers: [
        {
          url: 'http://localhost:4000',
          description: 'Development server'
        }
      ],
      tags: [
        // { name: 'health', description: 'Health check point.' },
        { name: 'utils', description: 'Utility end-points.' }
        // { name: 'users', description: 'get users' }
      ]
    }
  });

  await fastify.register(fastifySwaggerUi, {
    routePrefix: `/${config.api.namespace}/${config.api.version}/docs`,
    uiConfig: {
      docExpansion: 'list',
      filter: false,
      // Changes URL anchor when unfolding a particular service. Useful for sharing a deeplink URL.
      deepLinking: true
      // Disables the *Try it out* feature.
      // supportedSubmitMethods: []
    },
    logo: {
      type: 'image/svg+xml',
      content: Buffer.from('PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJFYmVuZV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjAiIHk9IjAiIHZpZXdCb3g9IjAgMCAyNTYxIDc4NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjU2MSA3ODYiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZT4uc3Qxe2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6I2ZmZn08L3N0eWxlPjxzd2l0Y2g+PGc+PHBhdGggZD0iTTc3MS4yIDcwNC42Yy0xNyAxLjItNTQuNyAzLjMtNzkgMy4zLTI0LjYgMC00Ny4xLS43LTU2LjQtMS43LTQxLjYtNC4zLTU1LjUtMjEtNTUuNS02My40VjM5OC41YzAtMjIuNC00LjEtMjkuOC0zMC0yOS44aC04NS45djI5Ni42YzAgODUuNiAyMS43IDEyMC43IDE3Mi41IDEyMC43IDExNi41IDAgMTYwLjgtNS44IDE2MC44LTUuOHMuMi00MC4yLjItNTUuN2MtLjEtMjAuNS0yLjItMjEuNi0yNi43LTE5Ljl6bTgzOC41LTI1NS44aC0xMDYuM2MtOS4zIDAtMTYuNCAzLjItMjEuNSAxMS4xbC01NC4xIDgwLjFoLTIuMWwtNTIuMi04MC4xYy01LTcuOC0xMS43LTExLjEtMjEtMTEuMWgtMTE3LjNsMTE2LjcgMTYyLjMtMTMwLjMgMTY3LjJoMTA2LjljMTAgMCAxNy4yLTQuNyAyMS41LTExLjRsNjQuOS05Ni43aDIuNmw2MC42IDkyLjljNi40IDExLjIgMTMuNiAxNS4xIDI0LjEgMTUuMWgxMjAuNWwtMTMyLTE3NCAxMTktMTU1LjR6bS00NTYuNCAwaC04OHYyNjQuNWMtMTYuMiA1LjktNDQuMyA3LjctNjMuMyA3LjctNDIuOCAwLTYxLjctMTYuMi02MS43LTQzLjNWNDY2LjNjMC05LjctNy43LTE3LjUtMTcuMy0xNy41aC04OC4xVjY3MWMwIDc5LjcgNTYuNCAxMTQuNyAxNjkuMyAxMTQuNyA2OC4xIDAgMTMzLjgtMTEgMTY2LjUtMjUuOFY0NjYuM2MwLTkuNy03LjgtMTcuNS0xNy40LTE3LjV6bTEwMTEuMy0xMDUuNUgyMDgzdjcxLjVoMTA1LjR2LTQ2LjZjMC0yMi4zLTMuNi0yNC45LTIzLjgtMjQuOXptMzg5IDEwMy45Yy0yNS4yLTMuNS01OS44LTUuOC05OS44LTUuNy01OC4xLjEtMTIxLjIgNS40LTE2MC4xIDE5LjZ2MzE3LjNIMjM5OXYtMjI0YzAtMjEuOCAxMi40LTM3LjQgMzMuNy00MC44IDE0LjktMi4zIDM2LjYtMy4yIDUxLjItMy4xIDI5LjQuMyA1Ny4zIDIuOSA3MS45IDcuMiAwIDAgMi43LjYgNC4xLS42IDEtLjggMS4xLTEuOCAxLjEtMy4xdi01OC42YzAtNS4zLTEuNi03LjQtNy40LTguMnptLTM4OSAxLjdIMjA4M3YzMjkuNWgxMDUuNHYtMzAzYzAtMjEuMi01LjItMjYuNS0yMy44LTI2LjV6bS0zNDIuNy03LjRjLTQzLjggMC05OC4yIDctMTM3LjcgMjAtMS41LjUtMS45IDEuNi0xLjkgMy4ydjU1YzAgOC4xIDIuNyAxMS45IDcuOSAxMS45IDMuMi4xIDcuMS0xLjggMTIuMi00IDMyLjEtMTMuOSA2Ny41LTIwLjQgMTEwLjgtMjAuNCA1Mi45IDAgNTkuMSA4LjUgNTkuMSAyNi4yIDAgMTQuOC0xIDE1LjItMjIuMyAyMS00OC4zIDEzLjgtMTA1LjIgMjYuNC0xNTAuNyA1MS44LTMxLjggMTcuNy00My4zIDQ5LjItNDMuMyA4Mi42IDAgNzIuNiA0NC40IDk3IDE0My4xIDk3IDgyLjkgMCAxNDMtMTAuNSAxNzguNi0yNVY1NDAuNWMuMS04Mi42LTgxLjUtOTktMTU1LjgtOTl6bTUwLjUgMjM2LjljMCAyNy41LTUuNyA0OC42LTU0LjYgNDguNi00MCAwLTU0LjQtMTUuNy01NC40LTQ4LjggMC0yMS43IDEyLjUtMzQuNCA0NS41LTQ3LjIgMjAuOS04LjUgNDEuOC0xNS43IDYzLjUtMjMuNnY3MXoiIHN0eWxlPSJmaWxsOiNmZmYiLz48cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjYyLjUgNDguNFM1OC43IDI5My40IDU4LjkgMjkzLjNjLTIuMSAyLjMtMi45IDUtMiA3LjIgMSAyLjQgMy4xIDMuOSA1LjkgMy45aDMxNC43YzIuOCAwIDQuOC0yLjUgNC44LTUuMSAwLTIuNy0xLjMtNC40LTQtNS0xMS40LTIuNi03My4xLTE2LTExNy43LTI5LjUtMjcuNS04LjMtMzguMS0zMi0zMS02My42IDcuOS0zNSA0MS40LTE0Ny4yIDQxLjYtMTQ3LjYuOC0yLjMuMi01LjEtMi4yLTYuMy0yLjctMS41LTUtLjgtNi41IDEuMXoiLz48cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjIxLjcgMGMxMjEuOCAwIDIyMSA5OS4yIDIyMSAyMjEuOCAwIDEyMS43LTk5LjIgMjIwLjktMjIxIDIyMC45Qzk5LjIgNDQyLjcgMCAzNDMuNSAwIDIyMS44IDAgOTkuMiA5OS4yIDAgMjIxLjcgMHptMCAyN0MxMTQuMiAyNyAyNyAxMTQuMyAyNyAyMjEuOGMwIDEwNy41IDg3LjMgMTk0LjggMTk0LjggMTk0LjggMTA3LjUgMCAxOTQuOC04Ny4zIDE5NC44LTE5NC44QzQxNi41IDExMy41IDMyOS4zIDI3IDIyMS43IDI3eiIvPjwvZz48L3N3aXRjaD48L3N2Zz4=', 'base64')
    },
    theme: {
      title: 'Graylog API documentation | IT',
      css: [
        { filename: 'theme.css', content: '.swagger-ui .topbar { background-color: #0091b8; } .download-url-wrapper { display: none !important; }' }
      ],
      favicon: [
        {
          filename: 'favicon.png',
          rel: 'icon',
          sizes: '32x32',
          type: 'image/png',
          content: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAADdcAAA3XAUIom3gAAAEpUExURUdwTACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACSuQCRuACRuACTuACRuACRuACRuACRuACRuACSuQCRtwCRuACRuACRuACRuACQuQCRuACRuACRuACRuACRuACRuACRuACRuACSuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuQCRuACTuQCRuACRuACRuACQuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuACRuQCRuFlo2ckAAABidFJOUwAsR3CSBZD7iSUHq/yKDw0K1CEoCdwMzNDw8YxY6W+DBSa1Apy6nd68BwWbmuGnAeKzKd3In6TmCAhVbamN7u3OdgRuApHyAgUUseTbfr8wfOsxEupa4OV0mCpD0y0TeicIZntG5wAAALlJREFUGBkFwQNiQ1EAALB0xa9Wt7Nt27bt7d3/EEvAb0drW/tnKgZIdrz8fNX+Pl6fE2vQ258r4P1NaWk0i+bcAL7rTxhOkFkp4PQ6f4baQkz6CibDIjhIablHdwg9oFL22KApH0ITOGl311BtCyF0gsNjLTcPlyGE0BXvQ6UsfXseRVEURVE0tby+cSRzUQRgtR4jvTkDYCKB5Nx0ESgNDo3BeHp2r5rcz8RHUllApnl3Z7t1ax7+AUNbGQBroLQsAAAAAElFTkSuQmCC', 'base64')
        }
      ]
    },
    staticCSP: true
  });
});
