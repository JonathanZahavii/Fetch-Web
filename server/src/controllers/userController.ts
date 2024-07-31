import { SignUpRequest } from '@shared/types/user.type';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const getTokens = (user: any) => {
  const { ACCESS_TOKEN_SECRET = '', REFRESH_TOKEN_SECRET = '', JWT_EXPIRATION } = process.env;
  const accessToken = jwt.sign({ user }, ACCESS_TOKEN_SECRET, { expiresIn: JWT_EXPIRATION });
  const refreshToken = jwt.sign({ user }, REFRESH_TOKEN_SECRET);
  return { accessToken, refreshToken };
};

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
    const { email, password } = req.body.user;
    const user = await User.findOne({ email }).lean();
    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }

    // Remove password from user object
    const { password: p, ...userWithoutPassword } = user;
    const { accessToken, refreshToken } = getTokens(userWithoutPassword);

    res.status(200).json({ user: userWithoutPassword, accessToken, refreshToken });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { user, refreshToken } = req.body;
  const { accessToken, refreshToken: newRefreshToken } = getTokens(user);
  res.status(200).json({ accessToken, refreshToken: newRefreshToken });
};
