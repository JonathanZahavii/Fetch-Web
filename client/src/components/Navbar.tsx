import AppLogo from '@/assets/AppLogo.png';
import AuthContext from '@/contexts/AuthContext';
import { HOME_URL, LOGIN_URL, SIGNUP_URL, WORKOUTS_URL } from '@/router/router.const';
import { AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* Left Side: Logo and Two Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => navigate(HOME_URL)}>
            <Box component="img" src={AppLogo} sx={{ width: '6vw' }} />
          </IconButton>
          <Button color="inherit" onClick={() => navigate(WORKOUTS_URL)}>
            WORKOUTS
          </Button>
          <Button color="inherit">MENU</Button>
        </Box>

        {/* Spacer to push content to the right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Right Side: Conditional Rendering */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {currentUser ? (
            <>
              <Avatar src="" sx={{ marginRight: 1 }} />
              <Typography variant="body1" color="inherit" sx={{ marginRight: 2 }}>
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
    </AppBar>
  );
};

export default Navbar;
