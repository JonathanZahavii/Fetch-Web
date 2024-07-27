import AppLogo from '@/assets/AppLogo.png';
import ControlledFileField from '@/components/ControlledFileField';
import ControlledTextField from '@/components/ControlledTextField';
import AuthContext from '@/contexts/AuthContext';
import { useAddPost } from '@/hooks/post/useAddPost';
import theme from '@/Theme';
import { handleFileChange } from '@/utils/handleFileChange';
import { onError } from '@/utils/onError';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import React, { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AddPostFormType, AddPostProps, createAddPostSchema } from './AddPost.config';

const AddPost: React.FC<AddPostProps> = ({ isOpen, close }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { currentUser } = useContext(AuthContext);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<AddPostFormType>({
    resolver: yupResolver(createAddPostSchema()),
    defaultValues: { caption: '', petName: '', location: '', when: undefined, image: null },
  });

  const onSuccess = () => {
    reset();
    setImagePreview(null);
    close();
  };

  const { mutate: addPost } = useAddPost(onSuccess, onError);

  const onSubmit = (data: AddPostFormType) => {
    data.image && currentUser && addPost({ ...data, user: currentUser, image: data.image });
  };

  const onCancel = () => {
    reset();
    setImagePreview(null);
    close();
  };

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle sx={{ color: theme.palette.primary.main }}>Add Post</DialogTitle>
      <DialogContent>
        <Grid container direction="column">
          <Grid item container sx={{ justifyContent: 'center', paddingY: '1vh' }}>
            {imagePreview ? (
              <Box
                component="img"
                src={imagePreview || AppLogo}
                sx={{ width: '20vw', maxHeight: '45vh' }}
              />
            ) : (
              <ControlledFileField
                name="image"
                fileInputRef={fileInputRef}
                handleFileChangeParent={event =>
                  handleFileChange({ event, setValue, setImagePreview })
                }
                control={control}
                errors={errors}
              />
            )}
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={6}>
              <ControlledTextField
                name="caption"
                label="Caption"
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid item xs={6}>
              <ControlledTextField
                name="petName"
                label="Pet Name"
                control={control}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={6}>
              <ControlledTextField
                name="location"
                label="Where"
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid item xs={6}>
              <ControlledTextField
                name="when"
                label="When"
                type="datetime-local"
                control={control}
                errors={errors}
                textfieldProps={{
                  InputLabelProps: { shrink: true },
                  inputProps: { inputProps: { max: new Date().toISOString().slice(0, 16) } },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit(onSubmit)}>
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPost;
