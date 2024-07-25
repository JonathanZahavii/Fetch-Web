import { yupResolver } from '@hookform/resolvers/yup';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { Grid, IconButton, TextField } from '@mui/material';
import React from 'react';
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
  // const onSuccess = () => {
  //   //TODO: reload comments - parent func
  // };
  // const onError = (error: Error) => {
  //   Swal.fire({ icon: 'error', title: 'Error', text: error.message });
  // };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<AddCommentType>({
    resolver: yupResolver<AddCommentType>(createAddCommentSchema()),
    defaultValues: { comment: '' },
  });

  const onSubmit = async (data: AddCommentType) => {
    console.log(data.comment);
    reset();
    //TODO: Send comment string and other metadata to backend
  };

  return (
    <Grid container direction={'row'} paddingY={'2vh'}>
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
