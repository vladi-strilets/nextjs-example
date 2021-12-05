import * as env from 'env-var';
import { credential } from 'firebase-admin';
import * as path from 'path';

const credentialName = env
  .get('FIREBASE_CREDENTIAL_JSON_PATH')
  .default('')
  .asString();

const credentialPath = path.join('./', credentialName);

const firebaseConfig = {
  credential: credential.cert(credentialPath),
  databaseURL: env.get('FIREBASE_DATABASE_URL').asString(),
  storageBucket: env.get('FIREBASE_STORAGE_BUCKET').asString(),
};

export default firebaseConfig;
