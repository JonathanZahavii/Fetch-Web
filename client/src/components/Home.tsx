import AppLogo from '@/assets/AppLogo.png';
import theme from '@/Theme';
import { Grid } from '@mui/material';
import React from 'react';

export const Home: React.FC = () => {
  return (
    <Grid
      sx={{ backgroundColor: theme.palette.primary.main }}
      container
      height={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Grid item>
        <img src={AppLogo} width={'600vw'} height={'250vh'} />
      </Grid>
    </Grid>
  );
};
