import * as env from 'env-var';

const entitiesConfig = {
  project: {
    defaultImage: env
      .get('APP_ENTITY_RPOJECT_DEFAULT_IMAGE')
      .default('')
      .asString(),
  },
  clientProfile: {
    defaultImage: env
      .get('APP_ENTITY_CLIENT_PROFILE_DEFAULT_IMAGE')
      .default('')
      .asString(),
  },
  proProfile: {
    defaultImage: env
      .get('APP_ENTITY_PRO_PROFILE_DEFAULT_IMAGE')
      .default('')
      .asString(),
  },
};

export default entitiesConfig;
