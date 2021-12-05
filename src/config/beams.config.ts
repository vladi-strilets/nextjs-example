import * as env from 'env-var';

const beamsConfig = {
  instanceId: env.get('BEAMS_INSTANCE_ID').default('').asString(),
  secretKey: env.get('BEAMS_SECRET_KEY').default('').asString(),
};

export default beamsConfig;
