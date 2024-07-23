import { EmptyFunction } from '@shared/types/emptyFunction.type';
import { User } from '@shared/types/user.type';
import { useMutation } from '@tanstack/react-query';
import { login, logout, signup, updateUser } from './user.service';

export const useSignup = (onSuccess: EmptyFunction, onError: (error: Error) => void) => {
  return useMutation({
    mutationFn: signup,
    onSuccess,
    onError,
  });
};

export const useLogin = (
  onSuccess: (data: { user: User; token: string; refreshToken: string }) => void,
  onError: (error: Error) => void
) => {
  return useMutation({
    mutationFn: login,
    onSuccess,
    onError,
  });
};

export const useLogout = (onSuccess: EmptyFunction, onError: (error: Error) => void) => {
  return useMutation({
    mutationFn: logout,
    onSuccess,
    onError,
  });
};

export const useUpdateUser = (onSuccess: (data: User) => void, onError: (error: Error) => void) => {
  return useMutation({
    mutationFn: updateUser,
    onSuccess,
    onError,
  });
};
