export default () => ({
  logger: {
    level: 'info',
  },
  port: 80,
  database: {
    type: 'better-sqlite3',
    database: `:memory:`,
  },
});
