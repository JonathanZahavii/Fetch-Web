import AuthContext from '@/contexts/AuthContext';
import { HOME_URL } from '@/router/router.const';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const { logout: logoutAuth } = useContext(AuthContext);

  const logout = () => {
    logoutAuth();
    navigate(HOME_URL);
  };

  return (
    <IconButton color="inherit" onClick={() => logout()}>
      <LogoutIcon />
    </IconButton>
  );
};

export default LogoutButton;
