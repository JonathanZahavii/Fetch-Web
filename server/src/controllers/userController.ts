import { SignUpRequest } from '@shared/types/user.type';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import logger from '../utils/logger.util';
dotenv.config();

const { REFRESH_TOKEN_SECRET = '', GOOGLE_CLIENT_ID = '' } = process.env;

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
    const user = await User.findOne({ email });
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
    const { password: p, ...userWithoutPassword } = user.toObject();
    const { accessToken, refreshToken } = getTokens(userWithoutPassword);

    if (!user.tokens || user.tokens === null) user.tokens = [refreshToken];
    else user?.tokens?.push(refreshToken);
    await user.save();

    return res.status(200).send({ user: userWithoutPassword, accessToken, refreshToken });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const token: string | undefined = req.params.refreshToken;
  if (!token) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, REFRESH_TOKEN_SECRET, async (err, { user }: any) => {
    if (err) return res.status(403).send(err.message);
    const userId = user._id;

    try {
      const dbUser = await User.findById(userId);
      if (!dbUser) return res.status(401).send('User not found');
      else if (!dbUser.tokens?.includes(token)) {
        dbUser.tokens = [];
        await dbUser.save();
        return res.status(403).send('Unauthorized');
      }

      const { accessToken, refreshToken } = getTokens(dbUser);
      dbUser.tokens[dbUser.tokens.indexOf(token)] = refreshToken;
      await dbUser.save();
      res.status(200).send({ accessToken, refreshToken });
    } catch (err) {
      res
        .status(500)
        .json({ message: err instanceof Error ? err.message : 'Unknown error occurred' });
    }
  });
};

const client = new OAuth2Client();
export const googleLogin = async (req: Request, res: Response) => {
  const { credential } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    logger.info(payload);
    const email = payload?.email ?? '';
    const name = payload?.name ?? '';
    let user = await User.findOne({ email });
    if (!user) user = await User.create({ email, name, password: 'google-signin' });
    const { accessToken, refreshToken } = getTokens(user);
    return res.status(200).send({ user, accessToken, refreshToken });
  } catch (err) {
    logger.error(err);
    return res.status(400).send('Error: missing email or password');
  }
};
