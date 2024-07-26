import { ErrorFunction } from '@shared/types/errorFunction.type';
import { addComment as addCommentType } from '@shared/types/post.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USE_GET_POSTS_KEY } from './useGetPosts';

const addComment = async (comment: addCommentType) => {
  console.log(comment);
  //    await api.post<PostType>('/comment', comment);
};

export const useAddComment = (onError: ErrorFunction) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (comment: addCommentType) => addComment(comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USE_GET_POSTS_KEY] });
    },
    onError,
  });
};
