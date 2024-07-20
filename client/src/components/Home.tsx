import React from 'react';
import { Grid } from '@mui/material';
import AppLogo from '@/assets/AppLogo.png';

export const Home: React.FC = (() => {
  return (
    <Grid container height={'100%'} justifyContent={'center'} alignItems={'center'}>
      <Grid item>
        <img src={AppLogo} width={'600vw'} height={'250vh'} />
      </Grid>
    </Grid>
  );
});
