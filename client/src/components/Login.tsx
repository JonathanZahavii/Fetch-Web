import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Grid, TextField, Typography } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import AppLogo from '@/assets/AppLogo.png';
import theme from '@/Theme';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      setError('Email is required.');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Box
        sx={{
          padding: '1rem',
          backgroundColor: theme.palette.secondary.dark,
          borderRadius: '8px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
          boxSizing: 'border-box',
          overflowY: 'auto',
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid item container direction={'column'} alignItems={'center'}>
            <Grid item>
              <img src={AppLogo} width={100} height={'fit-content'} />
            </Grid>
          </Grid>
          <FormControl fullWidth margin='normal'>
            <FormLabel
              sx={{
                color: theme.palette.primary.contrastText,
                textAlign: 'left',
              }}
            >
              Email Address
            </FormLabel>
            <TextField
              size='small'
              variant='outlined'
              required
              fullWidth
              id='email'
              name='email'
              autoComplete='email'
              autoFocus
              value={email}
              placeholder='example@trainer.com'
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                backgroundColor: theme.palette.primary.contrastText,
                borderRadius: '4px',
              }}
            />
          </FormControl>

          <FormControl fullWidth margin='normal'>
            <FormLabel
              sx={{
                color: theme.palette.primary.contrastText,
                textAlign: 'left',
              }}
            >
              Password
            </FormLabel>
            <TextField
              size='small'
              variant='outlined'
              required
              fullWidth
              name='password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={password}
              placeholder='******'
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                backgroundColor: theme.palette.primary.contrastText,
                borderRadius: '4px',
              }}
            />
          </FormControl>
          {error && (
            <Typography color='error' sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='info'
            sx={{ mt: 3, mb: 2, borderRadius: '10px' }}
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
