import { User } from '@shared/types/user.type';
import { createContext, FC, ReactNode, useState } from 'react';

interface AuthContext {
  currentUser: User | undefined;
  setCurrentUser: (user: User | undefined) => void;
}

const initialContext: AuthContext = {
  currentUser: undefined,
  setCurrentUser: () => {},
};

const AuthContext = createContext<AuthContext>(initialContext);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>();
  // TODO: Save in local storage
  // On startup check if token is valid
  // Yes - use it, else logout and clear local storage
  // Logout button should clear local storage
  const value = {
    currentUser,
    setCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
