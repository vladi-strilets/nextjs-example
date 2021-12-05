import { UnauthorizedException } from '@nestjs/common';
import { auth } from 'firebase-admin';
import { User } from 'src/api/users/entities/user.entity';
import { registerUserFromFirebaseToken } from './register-user-from-firebase-token.helper';

const getAuthUserByFirebaseUid = async (
  decodedToken: auth.DecodedIdToken,
): Promise<User> => {
  let authUser = await User.findOne({
    join: {
      alias: 'user',
      leftJoin: {
        auth: 'user.auth',
      },
    },
    where: {
      auth: {
        firebaseUid: decodedToken.uid,
      },
    },
  });

  if (!authUser) {
    // we assume that if user doesn't exist, but comes with a valid token,
    // we should create it as it's a new user
    authUser = await registerUserFromFirebaseToken(decodedToken);
  }

  return authUser;
};

export const getAuthUser = async (firebaseToken: string): Promise<User> => {
  const decodedToken = await auth()
    .verifyIdToken(firebaseToken)
    .catch((err) => {
      console.error('Firebase auth error', err);
      if (err.code === 'auth/id-token-expired') {
        throw new UnauthorizedException('Token has expired.');
      }
      throw new UnauthorizedException('Wrong access token.');
    });

  return getAuthUserByFirebaseUid(decodedToken);
};
