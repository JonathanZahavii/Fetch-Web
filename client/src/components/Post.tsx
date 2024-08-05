import AppLogo from '@/assets/AppLogo.png';
import AuthContext from '@/contexts/AuthContext';
import { useDeletePost } from '@/hooks/post/useDeletePost';
import { useLikePost } from '@/hooks/post/useLikePost';
import useDialog from '@/hooks/useDialog';
import AddPost from '@/pages/AddPost/AddPost';
import { formatDate } from '@/utils/formatDate.util';
import { onError } from '@/utils/onError';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, Button, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { Post as PostType } from '@shared/types/post.type';
import React, { useContext, useMemo } from 'react';
import CommentSection from './Comment/CommentSection';

type PostProps = {
  post: PostType;
  isEditable?: boolean;
};

const Post: React.FC<PostProps> = ({ post, isEditable = false }) => {
  const { isOpen: isOpenComment, close: closeComment, open: openComment } = useDialog();
  const { isOpen: isOpenPost, close: closePost, open: openPost } = useDialog();
  const { currentUser } = useContext(AuthContext);
  const formattedWhen = useMemo(() => formatDate(post.when), [post?.when]);

  const { mutate: likePost } = useLikePost(onError);
  const { mutate: deletePost } = useDeletePost(onError);

  const handleLike = () => {
    likePost({ postId: post._id, userId: currentUser?._id ?? '' });
  };

  const handleDelete = () => {
    deletePost(post._id);
  };

  return (
    <Grid
      container
      item
      sx={{
        padding: '3vh 3vh',
        flexDirection: 'column',
      }}
    >
      <Grid item container sx={{ alignItems: 'center' }}>
        <Grid item container xs={1.5} sx={{ justifyContent: 'center' }}>
          <Avatar src={post.user?.image ? `http://localhost:3000/${post.user.image}` : ''} />
        </Grid>
        <Grid container item sx={{ flexDirection: 'column' }} xs={8}>
          <Grid container item>
            <Typography color="primary" variant="body1">
              {post.user?.name || 'user-not-found'}
            </Typography>
            &nbsp;
            <Typography color="primary" variant="body1">
              |
            </Typography>
            &nbsp;
            <Typography color="primary" variant="body1">
              {post.petName}
            </Typography>
          </Grid>
          <Grid container item>
            <Typography color="secondary" variant="body2">
              {formattedWhen}
            </Typography>
            &nbsp;
            <Typography color="secondary" variant="body2">
              |
            </Typography>
            &nbsp;
            <Typography color="secondary" variant="body2">
              {post.location}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={2.5} sx={{ justifyContent: 'flex-end' }}>
          {isEditable && (
            <>
              <Tooltip title="Edit">
                <IconButton color="primary" onClick={openPost}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Grid>
      </Grid>

      <Grid container item sx={{ padding: '1vh', justifyContent: 'center' }}>
        <Box
          component="img"
          src={post.image ? `http://localhost:3000/${post.image}` : AppLogo}
          sx={{ width: '100%', height: '30vw' }}
        />
      </Grid>

      <Grid container item sx={{ padding: '1vh' }}>
        <Button variant="contained" color="primary" onClick={handleLike}>
          Likes ({post.likes.length})
        </Button>
        &nbsp;
        <Button variant="contained" color="primary" onClick={openComment}>
          Comment ({post.comments.length})
        </Button>
      </Grid>

      <Grid container item sx={{ flexDirection: 'column' }}>
        <Typography variant="h4">{post.caption}</Typography>
      </Grid>
      <CommentSection isOpen={isOpenComment} close={closeComment} comments={post.comments} postId={post._id}/>
      <AddPost isOpen={isOpenPost} close={closePost} post={post} />
    </Grid>
  );
};

export default Post;
