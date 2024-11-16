export default () => ({
  logger: {
    level: 'info',
  },
  storage: {
    // we force local file module to simplify deployment
    // to free hosting
    mode: 'local',
  },
});
