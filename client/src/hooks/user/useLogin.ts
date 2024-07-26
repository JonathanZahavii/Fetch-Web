import { auth } from '@/configs/firebaseConfig';
import { UserFormLogin } from '@/pages/Login/Login.config';
import { responseLogin } from '@shared/types/user.type';
import { useMutation } from '@tanstack/react-query';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';

export const login = async (user: UserFormLogin) => {
  // return async (user: User) => await Api.post('/auth/user/login', { user });
  const { email, password } = user;
  const u = await signInWithEmailAndPassword(auth, email, password);
  return {
    user: { email: u.user?.email ?? '', name: u.user?.displayName ?? '', uuid: uuidv4() },
    token: '1234',
    refreshToken: '1234',
  };
};

export const useLogin = (
  onSuccess: (data: responseLogin) => void,
  onError: (error: Error) => void
) => {
  return useMutation({
    mutationFn: login,
    onSuccess,
    onError,
  });
};
