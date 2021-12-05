import * as env from 'env-var';

const appConfig = {
  port: env.get('APP_PORT').default(3000).asIntPositive(),
};

export default appConfig;
