import { EmptyFunction } from '@shared/types/emptyFunction.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, signup } from './user.service';

export const useSaveUser = (onSuccess: EmptyFunction, onError: (error: Error) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signup,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [] });
      onSuccess?.();
    },
    onError: (error: Error) => {
      onError(error);
    },
  });
};

export const useLoginUser = (onSuccess: EmptyFunction, onError: (error: Error) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [] });
      onSuccess?.();
    },
    onError: (error: Error) => {
      onError(error);
    },
  });
};
