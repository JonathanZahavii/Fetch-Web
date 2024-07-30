import AppLogo from '@/assets/AppLogo.png';
import AuthContext from '@/contexts/AuthContext';
import useDialog from '@/hooks/useDialog';
import AddPost from '@/pages/AddPost/AddPost';
import { HOME_URL, LOGIN_URL, PROFILE_URL, SIGNUP_URL } from '@/router/router.const';
import { AppBar, Avatar, Box, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { PostType as PostTypeEnum } from '@shared/types/post.type';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { isOpen: isOpenSingle, close: closeSingle, open: openSingle } = useDialog();
  const { isOpen: isOpenPlaydate, close: closePlaydate, open: openPlaydate } = useDialog();

  const closeAddPost = () => {
    if (isOpenSingle) {
      closeSingle();
    } else if (isOpenPlaydate) {
      closePlaydate();
    }
  };

  const typeAddPost = () => {
    if (isOpenSingle) {
      return PostTypeEnum.SINGLE;
    } else if (isOpenPlaydate) {
      return PostTypeEnum.PLAYDATE;
    } else {
      return undefined;
    }
  };

  const handleNavigateProfile = () => {
    navigate(PROFILE_URL);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Grid container sx={{ alignItems: 'center' }}>
          <Grid item container sx={{ alignItems: 'center' }} xs={4}>
            <Grid item>
              <IconButton onClick={() => navigate(HOME_URL)}>
                <Box component="img" src={AppLogo} sx={{ width: '6vw' }} />
              </IconButton>
            </Grid>
            {currentUser && (
              <>
                <Grid item>
                  <Button color="secondary" onClick={openSingle}>
                    Add Post
                  </Button>
                </Grid>
                <Grid item>
                  <Button color="secondary" onClick={openPlaydate}>
                    Add Playdate
                  </Button>
                </Grid>
              </>
            )}
          </Grid>

          <Grid item container sx={{ alignItems: 'center', justifyContent: 'flex-end' }} xs={8}>
            {currentUser ? (
              <>
                <Grid item>
                  <Button onClick={handleNavigateProfile}>
                    {currentUser.photoURL ? (
                      <Box
                        component="img"
                        src={currentUser.photoURL}
                        sx={{ width: '6vw' }}
                        onClick={handleNavigateProfile}
                      />
                    ) : (
                      <Avatar src="" onClick={handleNavigateProfile} />
                    )}
                  </Button>
                </Grid>
                <Grid item>
                  <Typography variant="body1" color="inherit">
                    Hello, {currentUser.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <LogoutButton />
                </Grid>
              </>
            ) : (
              <>
                <Grid item>
                  <Button color="secondary" onClick={() => navigate(LOGIN_URL)}>
                    SIGN IN
                  </Button>
                </Grid>
                <Grid item>
                  <Button color="inherit" onClick={() => navigate(SIGNUP_URL)}>
                    SIGN UP
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Toolbar>
      <AddPost isOpen={isOpenSingle || isOpenPlaydate} close={closeAddPost} type={typeAddPost()} />
    </AppBar>
  );
};

export default Navbar;
