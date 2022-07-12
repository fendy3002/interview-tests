import { Env } from 'src/interfaces/config/Env';

export const parseEnv = () => {
  return {
    config: {
      env: process.env.NODE_ENV,
      port: process.env.PORT ? parseInt(process.env.PORT) : null,
    } as Env,
  };
};
