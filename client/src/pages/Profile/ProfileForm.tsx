import AppLogo from '@/assets/AppLogo.png';
import { useUpdateUser } from '@/hooks/api/user/user.api';
import {
  ProfileForm as ProfileFormType,
  createProfileSchema,
} from '@/pages/Profile/Profile.config';
import { yupResolver } from '@hookform/resolvers/yup';
import EditIcon from '@mui/icons-material/Edit';
import SaveButton from '@mui/icons-material/Save';
import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { User } from '@shared/types/user.type';
import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
type ProfileFormProps = {
  currentUser: User;
  setCurrentUser: (user: User) => void;
};

const ProfileForm: React.FC<ProfileFormProps> = ({
  currentUser,
  setCurrentUser,
}: ProfileFormProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(AppLogo);

  const onSuccess = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    setIsEdit(false);
  };
  const onError = (error: Error) => {
    Swal.fire({ icon: 'error', title: 'Error', text: error.message });
  };
  const { mutate: updateUser } = useUpdateUser(onSuccess, onError);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<ProfileFormType>({
    resolver: yupResolver<ProfileFormType>(createProfileSchema()),
    defaultValues: { name: currentUser?.name || '', photo: null },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setValue('photo', file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const onSubmit = async (data: ProfileFormType) => {
    updateUser({
      name: data.name,
      email: currentUser?.email || '',
      photoURL: currentUser?.photoURL,
      uuid: currentUser?.uuid || '',
    });
  };
  return (
    <>
      <Grid item>
        <Box component="img" src={imagePreview || AppLogo} sx={{ width: '6vw' }} />
        {isEdit && (
          <Controller
            name="photo"
            control={control}
            render={({ field }) => (
              <>
                <Button onClick={() => fileInputRef.current?.click()}>Choose File</Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  onChange={e => {
                    field.onChange(e.target.files);
                    handleFileChange(e);
                  }}
                />
                {errors.photo?.message && (
                  <Typography sx={{ color: 'red' }}>{errors.photo?.message}</Typography>
                )}
              </>
            )}
          />
        )}
      </Grid>
      <Grid item container direction={'row'} justifyContent="center">
        <Grid item>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { invalid } }) => (
              <TextField
                autoFocus
                disabled={!isEdit}
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
          {!isEdit ? (
            <IconButton onClick={() => setIsEdit(true)}>
              <EditIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleSubmit(onSubmit)}>
              <SaveButton />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileForm;
