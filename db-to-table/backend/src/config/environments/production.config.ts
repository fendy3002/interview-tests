export default () => ({
  logger: {
    level: 'info',
  },
  port: 80,
  database: {
    host: process.env.POSTGRESQL_HOSTNAME,
    port: parseInt(process.env.POSTGRESQL_PORT ?? '5432', 10),
    name: process.env.POSTGRESQL_DATABASE,
    username: process.env.POSTGRESQL_USERNAME,
    password: process.env.POSTGRESQL_PASSWORD,
  },
});
