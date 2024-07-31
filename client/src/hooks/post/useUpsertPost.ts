import api from '@/api/api';
import { EmptyFunction } from '@shared/types/emptyFunction.type';
import { ErrorFunction } from '@shared/types/errorFunction.type';
import { Post, upsertPost as upsertPostType } from '@shared/types/post.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USE_GET_POSTS_KEY } from './useGetPosts';

const upsertPost = async (post: upsertPostType) => {
  console.log(post);
  await api.post<Post>('/posts/upsert', post);
};

export const useUpsertPost = (onSuccess: EmptyFunction, onError: ErrorFunction) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: upsertPostType) => upsertPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USE_GET_POSTS_KEY] });
      onSuccess();
    },
    onError,
  });
};
