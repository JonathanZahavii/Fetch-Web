import AppLogo from '@/assets/AppLogo.png';
import { PageWrapperCenter } from '@/components/PageWrapper';
import AuthContext from '@/contexts/AuthContext';
import { useGoogleLogin } from '@/hooks/user/useGoogleLogin';
import { useLogin } from '@/hooks/user/useLogin';
import { HOME_URL } from '@/router/router.const';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, TextField } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { LoginRequest, LoginResponse } from '@shared/types/user.type';
import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { loginUserSchema } from './Login.schema';
import Styles from './Login.style';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login: loginAuth } = useContext(AuthContext);

  const onSuccess = (data: LoginResponse) => {
    loginAuth(data.user, data.token, data.refreshToken);
    navigate(HOME_URL);
  };
  const onError = (error?: Error) =>
    Swal.fire({ icon: 'error', title: 'Error', text: error?.message });

  const { mutate: login } = useLogin(onSuccess, onError);
  const { mutate: loginGoogle } = useGoogleLogin(onSuccess, onError);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginRequest>({
    resolver: yupResolver(loginUserSchema()),
    values: { email: '', password: '' },
  });

  const onSubmit = async (user: LoginRequest) => {
    await login(user);
  };

  return (
    <PageWrapperCenter container item>
      <Box sx={Styles.innerBox}>
        <Grid item container direction={'column'} alignItems={'center'}>
          <Grid item>
            <img src={AppLogo} width={100} height={'fit-content'} />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState: { invalid } }) => (
                <TextField
                  {...Styles.baseFieldProps}
                  helperText={errors.email?.message}
                  id="email"
                  label="Email Address"
                  autoFocus
                  placeholder="example@trainer.com"
                  sx={Styles.baseField}
                  {...field}
                  error={invalid}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState: { invalid } }) => (
                <TextField
                  {...Styles.baseFieldProps}
                  type="password"
                  helperText={errors.password?.message}
                  label="Password"
                  id="password"
                  placeholder="******"
                  sx={Styles.baseField}
                  {...field}
                  error={invalid}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Button onClick={handleSubmit(onSubmit)} {...Styles.buttonProps} sx={Styles.button}>
              Log In
            </Button>
          </Grid>
          <Grid container item>
            <GoogleLogin onSuccess={loginGoogle} onError={onError} />
          </Grid>
        </Grid>
      </Box>
    </PageWrapperCenter>
  );
};

export default Login;
