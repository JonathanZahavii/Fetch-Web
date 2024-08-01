import api from '@/api/api';
import { ErrorFunction } from '@shared/types/errorFunction.type';
import { User } from '@shared/types/user.type';
import { useMutation } from '@tanstack/react-query';

export const updateUser = async (user: User) => {
  return (await api.put('/auth/user/', { user })).data;
};

export const useUpdateUser = (onSuccess: (data: User) => void, onError: ErrorFunction) => {
  return useMutation({
    mutationFn: (user: User) => updateUser(user),
    onSuccess: (data: User) => {
      onSuccess(data);
    },
    onError,
  });
};
