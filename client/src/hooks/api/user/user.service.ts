// import Api from '@/api/api';
import { auth } from '@/configs/firebaseConfig';
import { UserFormLogin } from '@/pages/Login/Login.config';
import { NewUser, User } from '@shared/types/user.type';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';

// export const getUserByUpn = async () => (await Api.get<GetUserResBody>(`/auth/user`)).data.user;
export const getUserByUUID = (): User => {
  return { uuid: uuidv4(), name: 'John Doe', email: 'johndoe@example.com' };
};

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
  const u = await signInWithEmailAndPassword(auth, email, password);
  return {
    user: { email: u.user?.email ?? '', name: u.user?.displayName ?? '', uuid: uuidv4() },
    token: '1234',
    refreshToken: '1234',
  };
};

// export const logout = async (user: User) => await Api.post('/auth/user/login', { user });
export const logout = () => {
  return signOut(auth);
};
