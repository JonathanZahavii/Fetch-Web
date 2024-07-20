import * as yup from 'yup';
import { UserFormLogin } from './Login.config';

export const loginUserSchema = (): yup.ObjectSchema<UserFormLogin> =>
  yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  });
