import { User } from '@shared/types/user.type';
import { createContext, FC, ReactNode, useEffect, useState } from 'react';

interface AuthContext {
  login: (user: User, token: string, refreshToken: string) => void;
  logout: () => void;
  currentUser: User | undefined;
  accessToken: string;
  refreshToken: string;
  setAccessToken: (token: string) => void;
}

const initialContext: AuthContext = {
  login: () => {},
  logout: () => {},
  currentUser: undefined,
  accessToken: '',
  refreshToken: '',
  setAccessToken: () => {},
};

const AuthContext = createContext<AuthContext>(initialContext);

const CURRENT_USER_STORAGE_ITEM = 'currentUser';
const ACCESS_TOKEN_STORAGE_ITEM = 'accessToken';
const REFRESH_TOKEN_STORAGE_ITEM = 'refreshToken';

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const getCurrentUser = () =>
    JSON.parse(localStorage.getItem(CURRENT_USER_STORAGE_ITEM) as string);
  const getAccessToken = () =>
    JSON.parse(localStorage.getItem(ACCESS_TOKEN_STORAGE_ITEM) as string);
  const getRefreshToken = () =>
    JSON.parse(localStorage.getItem(REFRESH_TOKEN_STORAGE_ITEM) as string);

  const [currentUser, setCurrentUser] = useState<User | undefined>(getCurrentUser());
  const [accessToken, setAccessToken] = useState<string>(getAccessToken());
  const [refreshToken, setRefreshToken] = useState<string>(getRefreshToken());

  useEffect(() => {
    localStorage.setItem(CURRENT_USER_STORAGE_ITEM, JSON.stringify(currentUser));
  }, [currentUser]);
  useEffect(() => {
    localStorage.setItem(ACCESS_TOKEN_STORAGE_ITEM, accessToken);
  }, [accessToken]);
  useEffect(() => {
    localStorage.setItem(REFRESH_TOKEN_STORAGE_ITEM, refreshToken);
  }, [refreshToken]);

  const login = (user: User, accessToken: string, refreshToken: string) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setCurrentUser(user);
  };

  const logout = () => {
    setAccessToken('');
    setRefreshToken('');
    setCurrentUser(undefined);

    localStorage.removeItem(CURRENT_USER_STORAGE_ITEM);
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_ITEM);
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_ITEM);
  };

  const value = {
    currentUser,
    accessToken,
    refreshToken,
    login,
    logout,
    setAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
