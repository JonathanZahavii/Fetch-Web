// import Api from '@/api/api';
import { auth } from '@/configs/firebaseConfig';
import { NewUser } from '@shared/types/user.type';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

// export const signup = async (user: User) => await Api.post('/auth/user/', { user });

export const signup = async (user: NewUser) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { email, password, name } = user;
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email as string,
    password as string
  );
  if (userCredential.user) {
    await updateProfile(userCredential.user, {
      displayName: name as string,
    });
  }

  return userCredential;
};
