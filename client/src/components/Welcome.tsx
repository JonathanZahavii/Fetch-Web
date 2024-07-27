import AppLogo from '@/assets/AppLogo.png';
import Meowdy from '@/assets/Meowdy.png';
import { Box, Grid } from '@mui/material';
import React from 'react';
import { PageWrapperCenter } from './PageWrapper';

const Welcome: React.FC = () => {
  return (
    <PageWrapperCenter direction={'column'} container item>
      <Grid item>
        <Box component="img" src={AppLogo} sx={{ width: '20vw', maxWidth: '40vw' }} />
      </Grid>
      <Grid item>
        <Box component="img" src={Meowdy} sx={{ width: '20vw', maxWidth: '35vw' }} />
      </Grid>
    </PageWrapperCenter>
  );
};

export default Welcome;
