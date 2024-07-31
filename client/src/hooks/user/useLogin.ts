import { auth } from '@/configs/firebaseConfig';
import { ErrorFunction } from '@shared/types/errorFunction.type';
import { LoginRequest, LoginResponse } from '@shared/types/user.type';
import { useMutation } from '@tanstack/react-query';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';

export const login = async (user: LoginRequest) => {
  // return async (user: User) => await Api.post('/auth/user/login', { user });
  const { email, password } = user;
  const u = await signInWithEmailAndPassword(auth, email, password);
  return {
    user: { email: u.user?.email ?? '', name: u.user?.displayName ?? '', _id: uuidv4() },
    token: '1234',
    refreshToken: '1234',
  };
};

export const useLogin = (onSuccess: (data: LoginResponse) => void, onError: ErrorFunction) => {
  return useMutation({
    mutationFn: login,
    onSuccess,
    onError,
  });
};
