import { CredentialResponse } from '@react-oauth/google';
import { responseLogin } from '@shared/types/user.type';
import { useMutation } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

// Both signup and login
export const googleLogin = async (credentialResponse: CredentialResponse) => {
  // return async (user: User) => await Api.post('/auth/user/googleLogin', { credentialResponse.credential });
  console.log(credentialResponse.credential);
  return {
    user: { email: 'j@g.com', name: 'Jonathan', uuid: uuidv4() },
    token: '1234',
    refreshToken: '1234',
  };
};

export const useGoogleLogin = (
  onSuccess: (data: responseLogin) => void,
  onError: (error: Error) => void
) => {
  return useMutation({
    mutationFn: googleLogin,
    onSuccess,
    onError,
  });
};
