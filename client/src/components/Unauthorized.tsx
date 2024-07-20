import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME_URL } from '@/router/router.const';
import { Button, Grid, Typography } from '@mui/material';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      direction={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      height={'100%'}
    >
      <Typography variant={'h1'} color='error' fontWeight={600}>
        {'Unauthorized'}
      </Typography>
      <Typography variant={'h4'} color={'primary.light'}>
        {'You are not authorized to access this page.'}
      </Typography>
      <Button
        color={'error'}
        sx={{ textDecoration: 'underline' }}
        onClick={() => navigate(HOME_URL)}
      >
        <Typography variant={'h4'} color={'error'} fontWeight={600}>
          {'Go Home'}
        </Typography>
      </Button>
    </Grid>
  );
};

export default Unauthorized;
