import './dotenv';
// import dotenv first
import appProvidersConfig from './app-providers.config';
import appConfig from './app.config';
import beamsConfig from './beams.config';
import entitiesConfig from './entities.config';
import firebaseConfig from './firebase.config';
import * as ormConfig from './orm.config';
import swaggerConfig from './swagger.config';
import validationPipeOptions from './validation-pipe.config';

const config = {
  typeorm: ormConfig,
  app: appConfig,
  appProviders: appProvidersConfig,
  beams: beamsConfig,
  swagger: swaggerConfig,
  entities: entitiesConfig,
  validationPipe: validationPipeOptions,
  firebase: firebaseConfig,
};

export default config;
