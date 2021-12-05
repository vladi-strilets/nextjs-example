import { BadRequestException } from '@nestjs/common';
import { auth } from 'firebase-admin';
import { User } from 'src/api/users/entities/user.entity';
import { Auth } from '../entities/auth.entity';
import { CreateUserFromDecodedTokenInterface } from '../interfaces/create-user-from-decoded-token.interface';
import { mapRegisterProvider } from './map-register-provider.helper';

const createUserIfNotExists = async (
  data: CreateUserFromDecodedTokenInterface,
): Promise<User> => {
  const user = User.create({
    email: data.email,
  });
  await user.save();

  const authEntity = Auth.create({
    firebaseUid: data.firebaseUid,
    user,
  });
  await authEntity.save();

  return user;
};

export const registerUserFromFirebaseToken = async (
  decodedToken: auth.DecodedIdToken,
): Promise<User> => {
  const registerProvider = mapRegisterProvider(
    decodedToken.firebase.sign_in_provider,
  );

  if (registerProvider === undefined) {
    throw new BadRequestException('Wrong register provider');
  }

  const userData: CreateUserFromDecodedTokenInterface = {
    email: decodedToken.email,
    firebaseUid: decodedToken.uid,
    registerProvider,
  };

  return createUserIfNotExists(userData);
};
