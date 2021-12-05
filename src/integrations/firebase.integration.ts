import { initializeApp } from 'firebase-admin';
import config from 'src/config';

export const initializeFirebase = () => {
  initializeApp(config.firebase);
};
