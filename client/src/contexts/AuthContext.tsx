import { auth } from '@/configs/firebaseConfig';
import { NewUser } from '@shared/types/user.type';
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  signup: (data: NewUser) => Promise<UserCredential>;
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

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (data: NewUser) => {
    const { email, password, name } = data;
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
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
