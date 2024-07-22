import { EmptyFunction } from '@shared/types/emptyFunction.type';
import { User } from '@shared/types/user.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, logout, signup } from './user.service';

export const useSaveUser = (onSuccess: EmptyFunction, onError: (error: Error) => void) => {
  return useMutation({
    mutationFn: signup,
    onSuccess: async () => {
      onSuccess?.();
    },
    onError: (error: Error) => {
      onError(error);
    },
  });
};

export const useLoginUser = (
  onSuccess: (data: { user: User; token: string; refreshToken: string }) => void,
  onError: (error: Error) => void
) => {
  return useMutation({
    mutationFn: login,
    onSuccess,
    onError: (error: Error) => {
      onError(error);
    },
  });
};

export const useLogoutUser = (onSuccess: EmptyFunction, onError: (error: Error) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [] });
      onSuccess?.();
    },
    onError: (error: Error) => {
      onError(error);
    },
  });
};
