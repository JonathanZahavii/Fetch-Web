import { auth } from '@/configs/firebaseConfig';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  currentUser: User | null;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = () => {
    return signOut(auth)
      .then(() => {
        setCurrentUser(null);
      })
      .catch(error => {
        console.error('Error signing out: ', error);
      });
  };

  const value = {
    currentUser,
    loading,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
