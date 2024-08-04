import multer from 'multer';
import path from 'path';
import { Request, Response } from 'express';
import Post from '../models/postModel';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export { upload }; // Named export

export const upsertPostHandler = async (req: Request, res: Response) => {
  try {
    const postData = {
      caption: req.body.caption,
      petName: req.body.petName,
      location: req.body.location,
      when: req.body.when,
      image: req.file ? req.file.path : undefined, // Save image path if uploaded
    };

    const filter = { _id: req.body._id };

    const post = await Post.findOneAndUpdate(filter, postData, {
      new: true,
      upsert: true,
    });

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : 'Unknown error occurred' });
  }
};
