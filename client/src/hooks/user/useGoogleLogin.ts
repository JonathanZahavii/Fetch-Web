import { CredentialResponse } from '@react-oauth/google';
import { ErrorFunction } from '@shared/types/errorFunction.type';
import { LoginResponse } from '@shared/types/user.type';
import { useMutation } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

// Both signup and login
export const googleLogin = async (credentialResponse: CredentialResponse) => {
  // return await Api.post('/auth/user/googleLogin', { credential: credentialResponse.credential });
  console.log(credentialResponse.credential);
  return {
    user: { email: 'j@g.com', name: 'Jonathan', uuid: uuidv4() },
    token: '1234',
    refreshToken: '1234',
  };
};

export const useGoogleLogin = (
  onSuccess: (data: LoginResponse) => void,
  onError: ErrorFunction
) => {
  return useMutation({
    mutationFn: googleLogin,
    onSuccess,
    onError,
  });
};
