import { EmptyFunction } from '@shared/types/emptyFunction.type';
import { addPost as addPostFormType } from '@shared/types/post.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USE_GET_POSTS_KEY } from './useGetPosts';

const addPost = async (post: addPostFormType) => {
  console.log(post);
  //    await api.post<PostType>('/post', post);
};

export const useAddPost = (onSuccess: EmptyFunction, onError: (error: Error) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: addPostFormType) => addPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USE_GET_POSTS_KEY] });
      onSuccess();
    },
    onError,
  });
};
