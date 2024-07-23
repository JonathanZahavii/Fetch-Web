import AppLogo from '@/assets/AppLogo.png';
import Soli from '@/assets/soli.jpg';
import { HOME_URL } from '@/router/router.const';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { Post as PostType } from '@shared/types/post.type';
import React from 'react';
import { useNavigate } from 'react-router-dom';
type PostProps = {
  post: PostType;
};

const Post: React.FC<PostProps> = ({ post }: PostProps) => {
  const navigate = useNavigate();
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
      <Grid item container sx={{ padding: '1vh', alignItems: 'center', flexDirection: 'row'}}>
        <Grid item container xs={1.5} sx={{justifyContent:'center'}}>
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
        <Button variant="contained" color="primary" onClick={() => navigate(HOME_URL)}>
          Comment
        </Button>
      </Grid>

      <Grid container item sx={{ flexDirection: 'column', padding: '1vh' }}>
        <Typography variant="h4">{post.caption}</Typography>
        <Typography variant="h4">{post.location}</Typography>
      </Grid>
    </Grid>
  );
};

export default Post;
