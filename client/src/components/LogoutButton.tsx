import AuthContext from '@/contexts/AuthContext';
import { useLogoutUser } from '@/hooks/api/user/user.api';
import { HOME_URL } from '@/router/router.const';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);
  
  const onSuccess = () => {
    setCurrentUser(undefined);
    navigate(HOME_URL);
  };
  const onError = (error: Error) =>
    Swal.fire({ icon: 'error', title: 'Error', text: error.message });

  const { mutate: logout } = useLogoutUser(onSuccess, onError);

  return (
    <IconButton color="inherit" onClick={() => logout()}>
      <LogoutIcon />
    </IconButton>
  );
};

export default LogoutButton;
