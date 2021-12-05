import { REGISTER_PROVIDER } from '../types/register-providers.type';

export interface CreateUserFromDecodedTokenInterface {
  email: string;
  firebaseUid: string;
  registerProvider: REGISTER_PROVIDER;
}
