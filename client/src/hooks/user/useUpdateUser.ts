import api from '@/api/api';
import { ErrorFunction } from '@shared/types/errorFunction.type';
import { UpdateUser, User } from '@shared/types/user.type';
import { useMutation } from '@tanstack/react-query';

export const updateUser = async (user: UpdateUser) => {
  return (
    await api.put('/auth/user/', user, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  ).data;
};

export const useUpdateUser = (onSuccess: (data: User) => void, onError: ErrorFunction) => {
  return useMutation({
    mutationFn: (user: UpdateUser) => updateUser(user),
    onSuccess: (data: User) => {
      onSuccess(data);
    },
    onError,
  });
};
