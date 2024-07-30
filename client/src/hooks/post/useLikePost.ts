import { ErrorFunction } from '@shared/types/errorFunction.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USE_GET_POSTS_KEY } from '@/hooks/post/useGetPosts';

type UseLikeProps = {
  postId: string;
  userId: string;
};
const likePost = async ({ postId, userId }: UseLikeProps) => {
  console.log('like post: ' + postId + ' by user: ' + userId);
  // await api.post(`/posts/${postId}/like`, { userId });
};

export const useLikePost = (onError: ErrorFunction) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, userId }: UseLikeProps) => likePost({ postId, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USE_GET_POSTS_KEY] });
    },
    onError,
  });
};
