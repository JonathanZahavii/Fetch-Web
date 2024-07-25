import AppLogo from '@/assets/AppLogo.png';
import Soli from '@/assets/soli.jpg';
import useDialog from '@/hooks/useDialog';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { Post as PostType } from '@shared/types/post.type';
import React from 'react';
import CommentSection from './Comment/CommentSection';
type PostProps = {
  post: PostType;
};

const Post: React.FC<PostProps> = ({ post }: PostProps) => {
  const { isOpen: isOpenComment, close: closeComment, open: openComment } = useDialog();

  return (
    <Grid
      container
      item
      sx={{
        backgroundColor: 'white',
        padding: '3vh 3vh',
        flexDirection: 'column',
        marginBottom: '4vh',
      }}
    >
      <Grid item container sx={{ padding: '1vh', alignItems: 'center', flexDirection: 'row' }}>
        <Grid item container xs={1.5} sx={{ justifyContent: 'center' }}>
          <Avatar src={AppLogo} />
        </Grid>
        <Grid container item sx={{ flexDirection: 'column' }} xs={9}>
          <Typography variant="body1">{post.user.name}</Typography>
          <Typography variant="body2">{post.createdAt}</Typography>
        </Grid>
      </Grid>

      <Grid container item sx={{ padding: '1vh', justifyContent: 'center' }}>
        <Box component="img" src={Soli} sx={{ width: '100%', height: '30vw' }} />
      </Grid>

      <Grid container item sx={{ flexDirection: 'row', padding: '1vh' }}>
        <Button variant="contained" color="primary">
          Likes ({post.likes})
        </Button>
        &nbsp;
        <Button variant="contained" color="primary" onClick={openComment}>
          Comment ({post.comments.length})
        </Button>
      </Grid>

      <Grid container item sx={{ flexDirection: 'column', padding: '1vh' }}>
        <Typography variant="h4">{post.caption}</Typography>
        <Typography variant="h4">{post.location}</Typography>
      </Grid>
      <CommentSection isOpen={isOpenComment} close={closeComment} comments={post.comments} />
    </Grid>
  );
};

export default Post;
