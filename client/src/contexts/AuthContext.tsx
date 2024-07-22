import { User } from '@shared/types/user.type';
import { createContext, FC, ReactNode } from 'react';

interface AuthContext {
  login: (user: User, token: string, refreshToken: string) => void;
  logout: () => void;
  currentUser: () => User | undefined;
  accessToken: () => string;
  refreshToken: () => string;
  setAccessToken: (token: string) => void;
}

const initialContext: AuthContext = {
  login: () => {},
  logout: () => {},
  currentUser: () => undefined,
  accessToken: () => '',
  refreshToken: () => '',
  setAccessToken: () => {},
};

const AuthContext = createContext<AuthContext>(initialContext);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const CURRENT_USER_STORAGE_ITEM = 'currentUser';
  const TOKEN_STORAGE_ITEM = 'accessToken';
  const REFRESH_TOKEN_STORAGE_ITEM = 'refreshToken';

  const currentUser = () => JSON.parse(localStorage.getItem(CURRENT_USER_STORAGE_ITEM) as string);
  const accessToken = () => JSON.parse(localStorage.getItem(TOKEN_STORAGE_ITEM) as string);
  const refreshToken = () => JSON.parse(localStorage.getItem(REFRESH_TOKEN_STORAGE_ITEM) as string);
  const setAccessToken = (token: string) => localStorage.setItem(TOKEN_STORAGE_ITEM, token);

  const login = (user: User, token: string, refreshToken: string) => {
    localStorage.setItem(TOKEN_STORAGE_ITEM, token);
    localStorage.setItem(CURRENT_USER_STORAGE_ITEM, JSON.stringify(user));
    localStorage.setItem(REFRESH_TOKEN_STORAGE_ITEM, refreshToken);
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_STORAGE_ITEM);
    localStorage.removeItem(TOKEN_STORAGE_ITEM);
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
