import AppLogo from '@/assets/AppLogo.png';
import theme from '@/Theme';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AddPostFormType, AddPostProps, createAddPostSchema } from './AddPost.config';

const AddPost: React.FC<AddPostProps> = ({ isOpen, close }: AddPostProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<AddPostFormType>({
    resolver: yupResolver<AddPostFormType>(createAddPostSchema()),
    defaultValues: { caption: '', petName: '', where: '', when: undefined, photo: null },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setValue('photo', file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

  const onSubmit = async (data: AddPostFormType) => {
    // TODO: Submit data to API
    console.log(data);
  };
  const onCancel = () => {
    reset();
    close();
  };

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle sx={{ color: theme.palette.primary.contrastText }}>Add Post</DialogTitle>
      <DialogContent>
        <Grid container direction={'column'}>
          <Grid item container sx={{ justifyContent: 'center', paddingY: '1vh' }}>
            {photoPreview ? (
              <Box
                component="img"
                src={photoPreview || AppLogo}
                sx={{ width: '20vw', maxHeight: '45vh' }}
              />
            ) : (
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
          <Grid item container spacing={2} direction={'row'}>
            <Grid item xs={6}>
              <Controller
                control={control}
                name="caption"
                render={({ field, fieldState: { invalid } }) => (
                  <TextField
                    autoFocus
                    helperText={errors.caption?.message}
                    label="Caption"
                    error={invalid}
                    sx={{ width: '20vw' }}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                control={control}
                name="petName"
                render={({ field, fieldState: { invalid } }) => (
                  <TextField
                    autoFocus
                    helperText={errors.caption?.message}
                    label="Pet Name"
                    error={invalid}
                    sx={{ width: '20vw' }}
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2} direction={'row'}>
            <Grid item xs={6}>
              <Controller
                control={control}
                name="where"
                render={({ field, fieldState: { invalid } }) => (
                  <TextField
                    autoFocus
                    helperText={errors.caption?.message}
                    label="Where"
                    error={invalid}
                    sx={{ width: '20vw' }}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                control={control}
                name="when"
                render={({ field, fieldState: { invalid } }) => (
                  <TextField
                    type="datetime-local"
                    autoFocus
                    helperText={errors.caption?.message}
                    label="When"
                    error={invalid}
                    sx={{ width: '20vw' }}
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="warning" onClick={handleSubmit(onSubmit)}>
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPost;
