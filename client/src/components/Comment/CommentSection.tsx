import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Comment as CommentType } from '@shared/types/post.type';
import React from 'react';
import Loader from '../Loader';
import AddComment from './AddComment';
import Comment from './Comment';

type CommentSectionProps = {
  comments: CommentType[];
  isOpen: boolean;
  close: () => void;
};

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  isOpen,
  close,
}) => {
  return (
    <Dialog open={isOpen} onClose={close} maxWidth={'md'} fullWidth>
      <DialogTitle>Comments</DialogTitle>
      <DialogContent>
        <AddComment />
        {!comments ? (
          <Loader />
        ) : (
          comments.map(comment => <Comment key={comment.uuid} comment={comment} />)
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CommentSection;
