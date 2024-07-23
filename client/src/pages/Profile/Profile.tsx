import AppLogo from '@/assets/AppLogo.png';
import AuthContext from '@/contexts/AuthContext';
import { useUpdateUser } from '@/hooks/api/user/user.api';
import { yupResolver } from '@hookform/resolvers/yup';
import EditIcon from '@mui/icons-material/Edit';
import SaveButton from '@mui/icons-material/Save';
import { Grid, IconButton, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { User } from '@shared/types/user.type';
import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

export type ProfileForm = {
  name: string;
};

const createProfileSchema = (): yup.ObjectSchema<ProfileForm> =>
  yup.object({
    name: yup.string().required(),
  });

const Profile: React.FC = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [isNameEdit, setIsNameEdit] = useState(false);

  const onSuccess = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    setIsNameEdit(false);
  };
  const onError = (error: Error) => {
    console.log(error);
  };
  const { mutate: updateUser } = useUpdateUser(onSuccess, onError);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ProfileForm>({
    resolver: yupResolver<ProfileForm>(createProfileSchema()),
    values: { name: currentUser?.name || '' },
  });

  const onSubmit = async (data: ProfileForm) => {
    updateUser({
      name: data.name,
      email: currentUser?.email || '',
      photoURL: currentUser?.photoURL,
      uuid: currentUser?.uuid || '',
    });
  };

  return (
    <Grid container direction="column" spacing={2} alignItems="center" justifyContent="flex-start">
      <Grid item>
        <Box component="img" src={AppLogo} sx={{ width: '6vw' }} />
      </Grid>
      <Grid item container direction={'row'} justifyContent="center">
        <Grid item>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { invalid } }) => (
              <TextField
                autoFocus
                disabled={!isNameEdit}
                helperText={errors.name?.message}
                label="Name"
                error={invalid}
                sx={{ width: '20vw' }}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item alignItems={'center'} justifyContent={'center'}>
          {!isNameEdit ? (
            <IconButton onClick={() => setIsNameEdit(true)}>
              <EditIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleSubmit(onSubmit)}>
              <SaveButton />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Profile;
