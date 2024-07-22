import AppLogo from '@/assets/AppLogo.png';
import { Grid } from '@mui/material';
import React from 'react';

export const Home: React.FC = () => {
  return (
    <Grid item>
      <img src={AppLogo} width={'600vw'} height={'250vh'} />
    </Grid>
  );
};
