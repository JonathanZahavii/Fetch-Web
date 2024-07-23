import AppLogo from '@/assets/AppLogo.png';
import { useSignup } from '@/hooks/api/user/user.api';
import { LOGIN_URL } from '@/router/router.const';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { mapFormToPayload, UserForm } from './Signup.config';
import { createUserSchema } from './Signup.schema';
import Styles from './Signup.style';

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const onSuccess = () => {
    Swal.fire({ icon: 'success', title: 'User added successfully' });
    navigate(LOGIN_URL);
  };
  const onError = (error: Error) =>
    Swal.fire({ icon: 'error', title: 'Error', text: error.message });

  const { mutate: signup } = useSignup(onSuccess, onError);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<UserForm>({
    resolver: yupResolver<UserForm>(createUserSchema()),
    values: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: UserForm) => {
    await signup(mapFormToPayload(data));
  };

  return (
    <Box sx={Styles.innerBox}>
      <Grid item container direction={'column'} alignItems={'center'}>
        <Grid item>
          <img src={AppLogo} width={100} height={'fit-content'} />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { invalid } }) => (
              <TextField
                autoFocus
                helperText={errors.name?.message}
                label="Name"
                error={invalid}
                placeholder="Your name"
                {...Styles.baseFieldProps}
                sx={Styles.baseField}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState: { invalid } }) => (
              <TextField
                helperText={errors.email?.message}
                label="Email Address"
                placeholder="example@trainer.com"
                error={invalid}
                {...Styles.baseFieldProps}
                sx={Styles.baseField}
                {...field}
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
                helperText={errors.password?.message}
                label="Password"
                placeholder="******"
                type="password"
                error={invalid}
                {...Styles.baseFieldProps}
                sx={Styles.baseField}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field, fieldState: { invalid } }) => (
              <TextField
                helperText={errors.confirmPassword?.message}
                label="Confirm Password"
                placeholder="******"
                type="password"
                error={invalid}
                {...Styles.baseFieldProps}
                sx={Styles.baseField}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Button onClick={handleSubmit(onSubmit)} {...Styles.buttonProps} sx={Styles.button}>
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUp;
