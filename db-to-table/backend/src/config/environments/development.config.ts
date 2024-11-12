export default () => ({
  port: 3999,
  database: {
    type: 'postgres',
    host: 'localhost',
    port: 9432,
    name: 'testdb',
    username: 'testuser',
    password: 'testPass@123',
  },
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
