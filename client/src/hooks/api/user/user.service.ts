// import Api from '@/api/api';
import { auth } from '@/configs/firebaseConfig';
import { UserFormLogin } from '@/pages/Login/Login.config';
import { NewUser } from '@shared/types/user.type';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

// export const signup = async (user: User) => await Api.post('/auth/user/', { user });

export const signup = async (user: NewUser) => {
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

// export const login = async (user: User) => await Api.post('/auth/user/login', { user });

export const login = async (user: UserFormLogin) => {
  const { email, password } = user;
  return signInWithEmailAndPassword(auth, email, password);
};
