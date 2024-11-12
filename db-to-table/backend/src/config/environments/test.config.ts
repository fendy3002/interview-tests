export default () => ({
  logger: {
    level: 'info',
  },
  port: 80,
  database: {
    type: 'better-sqlite3',
    database: `:memory:`,
  },
  // will be better
  // if there's a way to mock these services better
  redis: {
    url: 'redis://localhost:9379',
  },
  minio: {
    bucketName: 'testbucket',
    endPoint: 'localhost',
    port: 9100,
    useSSL: false,
    accessKey: 'testuser',
    secretKey: 'testPass@123',
  },
});
