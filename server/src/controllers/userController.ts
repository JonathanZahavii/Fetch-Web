import { SignUpRequest } from '@shared/types/user.type';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import User from '../models/userModel';

export const signUp = async (req: Request, res: Response) => {
  try {
    const userData: SignUpRequest = req.body.user;

    const userExists = await User.findOne({ email: userData.email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(userData.password, salt);
    userData.password = encryptedPassword;

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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    // Remove password from user object
    const { password: p, ...userWithoutPassword } = user;

    res.status(200).json(userWithoutPassword);
    // Return token and refresh token
    res.status(200).json(user);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};
