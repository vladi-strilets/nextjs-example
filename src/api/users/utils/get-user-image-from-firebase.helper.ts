import { auth } from 'firebase-admin';

export const getUserImageFromFirebase = async (
  uid: string,
): Promise<string> => {
  const userRecord = await auth().getUser(uid);

  return userRecord.photoURL;
};
