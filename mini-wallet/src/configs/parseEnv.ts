import { Env } from 'src/interfaces/config/Env';

export const parseEnv = () => {
  return {
    config: {
      env: process.env.NODE_ENV,
      AuthorizationToken: process.env.AUTH_TOKEN,
      port: process.env.PORT ? parseInt(process.env.PORT) : null,
    } as Env,
  };
};
