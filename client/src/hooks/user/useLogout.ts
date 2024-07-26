import { auth } from '@/configs/firebaseConfig';
import { EmptyFunction } from '@shared/types/emptyFunction.type';
import { ErrorFunction } from '@shared/types/errorFunction.type';
import { useMutation } from '@tanstack/react-query';
import { signOut } from 'firebase/auth';

export const logout = () => {
  // return async (user: User) => await Api.post('/auth/user/login', { user });
  return signOut(auth);
};

export const useLogout = (onSuccess: EmptyFunction, onError: ErrorFunction) => {
  return useMutation({
    mutationFn: logout,
    onSuccess,
    onError,
  });
};
