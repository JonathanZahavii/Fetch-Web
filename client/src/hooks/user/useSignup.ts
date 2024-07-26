import { auth } from '@/configs/firebaseConfig';
import { EmptyFunction } from '@shared/types/emptyFunction.type';
import { ErrorFunction } from '@shared/types/errorFunction.type';
import { NewUser } from '@shared/types/user.type';
import { useMutation } from '@tanstack/react-query';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export const signup = async (user: NewUser) => {
  // async (user: User) => await Api.post('/auth/user/', { user });

  const { email, password, name } = user;
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email as string,
    password as string
  );
  if (userCredential.user) {
    await updateProfile(userCredential.user, {
      displayName: name as string,
    });
  }

  return userCredential;
};

export const useSignup = (onSuccess: EmptyFunction, onError: ErrorFunction) => {
  return useMutation({
    mutationFn: signup,
    onSuccess,
    onError,
  });
};
