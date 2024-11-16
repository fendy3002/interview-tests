import * as deepmerge from 'deepmerge';
import * as path from 'path';
import { existsSync } from 'fs';

const defaultAppConfig = () => ({
  logger: {
    level: 'debug',
  },
  port: parseInt(process.env.PORT ?? '3000', 10),
  database: {
    type: 'postgres',
    host: process.env.POSTGRESQL_HOSTNAME,
    port: parseInt(process.env.POSTGRESQL_PORT ?? '5432', 10),
    name: process.env.POSTGRESQL_DATABASE,
    username: process.env.POSTGRESQL_USERNAME,
    password: process.env.POSTGRESQL_PASSWORD,
  },
  redis: {
    url: process.env.REDIS_URL,
  },
  storage: {
    mode: 'minio',
  },
  localStorage: {
    directory: path.join(__dirname, '..', '..', 'temp'),
  },
  // we use minio for now, can be switched with s3
  minio: {
    bucketName: process.env.MINIO_BUCKET,
    endPoint: process.env.MINIO_ENDPOINT,
    port: parseInt(process.env.MINIO_PORT ?? '9000', 10),
    useSSL: process.env.MINIO_SSL,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
  },
  nodeEnv: process.env.NODE_ENV,
});
export default () => {
  const envName = (process.env.NODE_ENV ?? '').toLowerCase();
  if (
    envName &&
    (existsSync(__dirname + `/environments/${envName}.config.js`) ||
      existsSync(__dirname + `/environments/${envName}.config.ts`))
  ) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const envConfig = require(`./environments/${envName}.config`).default;
    return deepmerge(defaultAppConfig(), envConfig());
  }
  return defaultAppConfig();
};
