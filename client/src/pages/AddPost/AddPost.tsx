import AppLogo from '@/assets/AppLogo.png';
import AuthContext from '@/contexts/AuthContext';
import { useAddPost } from '@/hooks/post/useAddPost';
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
import React, { useContext, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AddPostFormType, AddPostProps, createAddPostSchema } from './AddPost.config';
import Swal from 'sweetalert2';

const AddPost: React.FC<AddPostProps> = ({ isOpen, close }: AddPostProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { currentUser } = useContext(AuthContext);
  const { mutate: addPost } = useAddPost(onSuccess, onError);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<AddPostFormType>({
    resolver: yupResolver<AddPostFormType>(createAddPostSchema()),
    defaultValues: { caption: '', petName: '', location: '', when: undefined, image: null },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setValue('image', file);
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

  const onSuccess = () => {
    reset();
    close();
  };

  const onError = (error: Error) => {
    Swal.fire({ icon: 'error', title: 'Error', text: error.message });
  };

  const onSubmit = async (data: AddPostFormType) => {
    const post = {
      image: data.image!,
      caption: data.caption,
      petName: data.petName,
      location: data.location,
      when: data.when,
      user: currentUser!,
    };
    addPost(post);
  };
  const onCancel = () => {
    reset();
    close();
  };

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle sx={{ color: theme.palette.primary.main }}>Add Post</DialogTitle>
      <DialogContent>
        <Grid container direction={'column'}>
          <Grid item container sx={{ justifyContent: 'center', paddingY: '1vh' }}>
            {imagePreview ? (
              <Box
                component="img"
                src={imagePreview || AppLogo}
                sx={{ width: '20vw', maxHeight: '45vh' }}
              />
            ) : (
              <Controller
                name="image"
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
                    {errors.image?.message && (
                      <Typography sx={{ color: 'red' }}>{errors.image?.message}</Typography>
                    )}
                  </>
                )}
              />
            )}
          </Grid>
          <Grid item container spacing={2} direction={'row'} sx={{ marginBottom: '2vh' }}>
            <Grid item xs={6}>
              <Controller
                control={control}
                name="caption"
                render={({ field, fieldState: { invalid } }) => (
                  <TextField
                    autoFocus
                    helperText={errors.image?.message}
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
                    helperText={errors.image?.message}
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
                name="location"
                render={({ field, fieldState: { invalid } }) => (
                  <TextField
                    autoFocus
                    helperText={errors.image?.message}
                    label="location"
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
                    helperText={errors.image?.message}
                    label="When"
                    error={invalid}
                    sx={{ width: '20vw' }}
                    {...field}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { max: new Date().toISOString().slice(0, 16) } }}
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
