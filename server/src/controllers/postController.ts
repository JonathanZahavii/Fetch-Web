import { Request, Response } from 'express';
import Post from '../models/postModel';
import { upsertPost as UpsertPostType } from '@shared/types/post.type';

export const addPost = async (req: Request, res: Response) => {
  try {
    const postData: UpsertPostType = req.body;
    const post = new Post(postData);
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

export const editPost = async (req: Request, res: Response) => {
  try {
    const postData: UpsertPostType = req.body;
    const post = await Post.findByIdAndUpdate(req.params.id, postData, { new: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

export const upsertPost = async (req: Request, res: Response) => {
  try {
    const postData: UpsertPostType = req.body;

    // Define the filter to find the post by uuid
    const filter = { uuid: req.body.uuid };

    // Perform the upsert operation
    const post = await Post.findOneAndUpdate(filter, postData, {
      new: true,  // Return the updated document
      upsert: true,  // Create the document if it does not exist
    });

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : 'Unknown error occurred' });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
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
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};
