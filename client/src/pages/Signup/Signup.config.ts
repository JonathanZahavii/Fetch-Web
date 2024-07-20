import { NewUser } from '@shared/types/user.type';

export type UserForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const mapFormToPayload = (data: UserForm): NewUser => {
  return {
    name: data.name,
    email: data.email,
    password: data.password,
  };
};
