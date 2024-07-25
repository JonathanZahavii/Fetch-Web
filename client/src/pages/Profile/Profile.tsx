import AuthContext from '@/contexts/AuthContext';
import Feed from '@/pages/Feed/Feed';
import { Grid } from '@mui/material';
import React, { useContext } from 'react';
import ProfileForm from './ProfileForm';

const Profile: React.FC = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  return (
    <Grid container direction="column" spacing={2} alignItems="center" justifyContent="flex-start">
      {currentUser && <ProfileForm currentUser={currentUser} setCurrentUser={setCurrentUser} />}
      <Feed />
    </Grid>
  );
};

export default Profile;
