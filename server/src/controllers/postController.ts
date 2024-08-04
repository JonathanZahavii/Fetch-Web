import { Post as PostType, upsertPost as UpsertPostType } from '@shared/types/post.type';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Post from '../models/postModel';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const upsertPost = async (req: MulterRequest, res: Response) => {
  try {
    const postData: PostType = req.body;
    if (req.file) {
      postData.image = req.file.path;
    }

    const filter = { _id: req.body._id || uuidv4() };

    const post = await Post.findOneAndUpdate(filter, postData, {
      new: true,
      upsert: true,
    });

    res.status(200).json(post);
  } catch (err) {
      res
      .status(500)
      .json({ message: err instanceof Error ? err.message : 'Unknown error occurred' });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    res
      .status(500)
      .json({ message: err instanceof Error ? err.message : 'Unknown error occurred' });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ message: err instanceof Error ? err.message : 'Unknown error occurred' });
  }
};

export const likePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.likes += 1;
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res
      .status(500)
      .json({ message: err instanceof Error ? err.message : 'Unknown error occurred' });
  }
};
