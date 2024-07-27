import AuthContext from '@/contexts/AuthContext';
import { useAddComment } from '@/hooks/post/useAddComment';
import { onError } from '@/utils/onError';
import { yupResolver } from '@hookform/resolvers/yup';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { Grid, IconButton, TextField } from '@mui/material';
import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

type AddCommentType = {
  comment: string;
};

const createAddCommentSchema = () =>
  yup.object({
    comment: yup.string().required(),
  });

const AddComment: React.FC = () => {
  const { currentUser } = useContext(AuthContext);

  const { mutate: addComment } = useAddComment(onError);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<AddCommentType>({
    resolver: yupResolver(createAddCommentSchema()),
    defaultValues: { comment: '' },
  });

  const onSubmit = async (data: AddCommentType) => {
    const comment = { content: data.comment, user: currentUser! };
    addComment(comment);
    reset();
  };

  return (
    <Grid container paddingY={'2vh'}>
      <Grid item container xs={11} sx={{ justifyContent: 'center' }}>
        <Controller
          control={control}
          name="comment"
          render={({ field, fieldState: { invalid } }) => (
            <TextField
              fullWidth
              helperText={errors.comment?.message}
              label="Comment"
              error={invalid}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item container xs={1} sx={{ justifyContent: 'center' }}>
        <IconButton color="primary" onClick={handleSubmit(onSubmit)}>
          <AddCommentIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default AddComment;
