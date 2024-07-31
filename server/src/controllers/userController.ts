import { SignUpRequest } from '@shared/types/user.type';
import { Request, Response } from 'express';
import User from '../models/userModel';

export const signUp = async (req: Request, res: Response) => {
  try {
    const userData: SignUpRequest = req.body.user;
    const user = new User(userData);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};
