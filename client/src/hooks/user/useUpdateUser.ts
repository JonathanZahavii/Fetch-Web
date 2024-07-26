import { auth } from '@/configs/firebaseConfig';
import { User } from '@shared/types/user.type';
import { useMutation } from '@tanstack/react-query';
import { updateProfile } from 'firebase/auth';

// TODO: Set User type photo to file?
export const updateUser = async (user: User) => {
  // return async (user: User) => await Api.put('/auth/user/', { user });
  const { currentUser } = auth;
  currentUser &&
    (await updateProfile(currentUser, {
      displayName: user?.name,
      photoURL: user?.photoURL,
    }));
  return user;
};

export const useUpdateUser = (onSuccess: (data: User) => void, onError: (error: Error) => void) => {
  return useMutation({
    mutationFn: updateUser,
    onSuccess,
    onError,
  });
};
