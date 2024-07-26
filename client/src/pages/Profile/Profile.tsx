import Loader from '@/components/Loader';
import Posts from '@/components/Posts';
import AuthContext from '@/contexts/AuthContext';
import { useGetPosts } from '@/hooks/post/useGetPosts';
import { Grid } from '@mui/material';
import React, { useContext } from 'react';
import ProfileForm from './ProfileForm';

const Profile: React.FC = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { data, isLoading } = useGetPosts(currentUser?.uuid);
  return (
    <Grid container direction="column" spacing={2} alignItems="center" justifyContent="flex-start">
      {currentUser && <ProfileForm currentUser={currentUser} setCurrentUser={setCurrentUser} />}
      {isLoading || !data ? <Loader /> : <Posts posts={data} isEditable={true} />}
    </Grid>
  );
};

export default Profile;
