import { Request, Response } from 'express';
import Comment from '../models/commentModel';
import { addComment as AddCommentType } from '@shared/types/post.type';

export const addComment = async (req: Request, res: Response) => {
  try {
    const commentData: AddCommentType = req.body;
    const comment = new Comment(commentData);
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};
