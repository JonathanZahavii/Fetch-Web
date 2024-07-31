import api from '@/api/api';
import { EmptyFunction } from '@shared/types/emptyFunction.type';
import { ErrorFunction } from '@shared/types/errorFunction.type';
import { Post } from '@shared/types/post.type'; // Import Post type for the response
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USE_GET_POSTS_KEY } from './useGetPosts';

const upsertPost = async (formData: FormData) => {
  await api.post<Post>('/posts/upsert', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const useUpsertPost = (onSuccess: EmptyFunction, onError: ErrorFunction) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => upsertPost(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USE_GET_POSTS_KEY] });
      onSuccess();
    },
    onError,
  });
};
