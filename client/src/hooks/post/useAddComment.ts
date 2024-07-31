import { ErrorFunction } from '@shared/types/errorFunction.type';
import { addComment as addCommentType, Post } from '@shared/types/post.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USE_GET_POSTS_KEY } from './useGetPosts';
import api from '@/api/api';

const addComment = async (comment: addCommentType) => {
  console.log(comment);
     await api.post<Post>('/comments/add', comment);
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
