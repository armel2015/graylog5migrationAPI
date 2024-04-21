if (process.env.NODE_ENV !== 'production') {
  await import('dotenv/config');
}

export default {
  env: process.env.ENV,
  app: {
    identifier: 'api.graylog',
    version: process.env.APP_VERSION
  },
  url: {
    baseUrlFrom: 'https://graylog.prod/api',
    authorizationFrom: 'Basic YXdha2FtdGFsbGE6YXZyaWwyMDI0QA==',

    baseUrlTo: 'http://localhost:9000/api',
    authorizationTo: 'Basic YWRtaW46dG9jaGFuZ2U='
    /*
    baseUrlAcc: 'https://grayloga-tmp.acc',
    baseUrlFrom: 'https://graylog.prod/api',
    baseUrlTo: 'http://localhost:9000/api',
    authorizationFrom: 'Basic YXdha2FtdGFsbGE6YXZyaWwyMDI0QA==',
    authorizationTo: 'Basic YWRtaW46dG9jaGFuZ2U='
    */
  },
  api: {
    namespace: 'graylog',
    version: 'v1'
  },
  log: {
    hostname: 'grayloga.svr',
    port: '12201'
  }
};

export const keyValues = { routeName: ['health'] };

// Add required config variable names here
// TODO - Do we want to allow empty strings?
export const requiredConfVars = {
  varName: [
    'LOG_HOSTNAME',
    'LOG_PORT'
  ]
};
