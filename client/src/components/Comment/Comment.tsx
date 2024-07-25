import { Grid, Typography } from '@mui/material';
import { Comment as CommentType } from '@shared/types/post.type';
import React from 'react';

type CommentProps = {
  comment: CommentType;
};

const Comment: React.FC<CommentProps> = ({ comment }: CommentProps) => {
  return (
    <Grid container direction={'column'} paddingY={'2vh'}>
      <Grid item container direction={'row'}>
        <Typography variant="body1">{comment.user.name}</Typography>
        &nbsp;
        <Typography variant="caption">{comment.createdAt}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h4">{comment.content}</Typography>
      </Grid>
    </Grid>
  );
};

export default Comment;
