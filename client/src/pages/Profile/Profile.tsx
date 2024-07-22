import AppLogo from '@/assets/AppLogo.png';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Styles from './Profile.style';

const Profile: React.FC = () => {
  return (
    <Box sx={Styles.outerBox}>
      <Grid item container direction={'column'} alignItems={'center'}>
        <Grid item>
          <Box component="img" src={AppLogo} sx={{ width: '6vw' }} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
