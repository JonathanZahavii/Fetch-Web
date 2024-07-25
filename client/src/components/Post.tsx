import AppLogo from '@/assets/AppLogo.png';
import Soli from '@/assets/soli.jpg';
import useDialog from '@/hooks/useDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, Button, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { Post as PostType } from '@shared/types/post.type';
import React from 'react';
import CommentSection from './Comment/CommentSection';

type PostProps = {
  post: PostType;
  isEditable?: boolean;
};

const Post: React.FC<PostProps> = ({ post, isEditable = false }: PostProps) => {
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
      <Grid item container sx={{ alignItems: 'center', flexDirection: 'row' }}>
        <Grid item container xs={1.5} sx={{ justifyContent: 'center' }}>
          <Avatar src={post.user?.photoURL || AppLogo} />
        </Grid>
        <Grid container item sx={{ flexDirection: 'column' }} xs={8}>
          <Typography variant="body1">{post.user.name}</Typography>
          <Grid container item sx={{ flexDirection: 'row' }} xs={9}>
            <Typography variant="body2">{post.createdAt}</Typography>
            &nbsp;
            <Typography variant="body2">|</Typography>
            &nbsp;
            <Typography variant="body2">{post.location}</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={2.5} sx={{ justifyContent: 'flex-end' }}>
          {isEditable && (
            <>
              <Tooltip title="Edit">
                <IconButton color="primary">
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton color="primary">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
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
      </Grid>
      <CommentSection isOpen={isOpenComment} close={closeComment} comments={post.comments} />
    </Grid>
  );
};

export default Post;
