import { REGISTER_PROVIDER } from '../types/register-providers.type';

const providersMap = {
  password: REGISTER_PROVIDER.PASSWORD,
  'google.com': REGISTER_PROVIDER.GOOGLE,
  'facebook.com': REGISTER_PROVIDER.FACEBOOK,
};

export const mapRegisterProvider = (provider: string): REGISTER_PROVIDER =>
  providersMap[provider];
