import AppLogo from '@/assets/AppLogo.png';
import AuthContext from '@/contexts/AuthContext';
import useDialog from '@/hooks/useDialog';
import AddPost from '@/pages/AddPost/AddPost';
import { HOME_URL, LOGIN_URL, PROFILE_URL, SIGNUP_URL } from '@/router/router.const';
import { AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { isOpen, close, open } = useDialog();

  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* Left Side: Logo and Two Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => navigate(HOME_URL)}>
            <Box component="img" src={AppLogo} sx={{ width: '6vw' }} />
          </IconButton>
          {currentUser && (
            <Button color="inherit" onClick={open}>
              Add Post
            </Button>
          )}
          {/* <Button color="inherit" onClick={() => navigate(WORKOUTS_URL)}>
            WORKOUTS
          </Button> */}
        </Box>

        {/* Spacer to push content to the right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Right Side: Conditional Rendering */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
          {currentUser ? (
            <>
              <Button onClick={() => navigate(PROFILE_URL)}>
                {currentUser.photoURL ? (
                  <Box
                    component="img"
                    src={currentUser.photoURL}
                    sx={{ width: '6vw' }}
                    onClick={() => navigate(PROFILE_URL)}
                  />
                ) : (
                  <Avatar src="" onClick={() => navigate(PROFILE_URL)} />
                )}
              </Button>
              <Typography variant="body1" color="inherit">
                Hello, {currentUser.name}
              </Typography>
              <LogoutButton />
            </>
          ) : (
            <>
              <Button
                sx={{ backgroundColor: 'info.main', borderRadius: '15px', p: '6px 12px' }}
                onClick={() => navigate(LOGIN_URL)}
              >
                SIGN IN
              </Button>
              <Button
                sx={{ backgroundColor: 'primary.light', borderRadius: '15px', p: '6px 12px' }}
                onClick={() => navigate(SIGNUP_URL)}
              >
                SIGN UP
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
      <AddPost isOpen={isOpen} close={close} />
    </AppBar>
  );
};

export default Navbar;
