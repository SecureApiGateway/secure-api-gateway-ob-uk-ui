import { environment as defaultEnv } from './environment.default';

export const environment = {
  ...defaultEnv,
  production: true,
  swaggerJSON: 'https://rs.dev.forgerock.financial/api-docs'
};
