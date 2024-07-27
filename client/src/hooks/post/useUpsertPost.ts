import { EmptyFunction } from '@shared/types/emptyFunction.type';
import { ErrorFunction } from '@shared/types/errorFunction.type';
import { upsertPost as upsertPostType } from '@shared/types/post.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USE_GET_POSTS_KEY } from './useGetPosts';

const upsertPost = async (post: upsertPostType) => {
  console.log(post);
  //    await api.post<PostType>('/post', post);
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
