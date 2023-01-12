import React, { createContext, useState, useCallback, useContext } from 'react';
import api from '../services/api';
import { useToast } from './toast';

interface User {
  id: string;
  name: string;
  avatar: string;
  avatar_url: string;
  email: string;
  telephone_number: string;
  organization_name: string;
  role: string
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  token: string;
  signIn(credentials: SignInCredentials): Promise<User>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const { addToast } = useToast()
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Safety:token');
    const user = localStorage.getItem('@Safety:user');
    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });
  const signIn = useCallback(async ({ email, password }) => {
    try {
      const response = await api.post('sessions', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('@Safety:token', token);
      localStorage.setItem('@Safety:user', JSON.stringify(user));
      // api.defaults.headers.authorization = `Bearer ${token}`;
      setData({ token, user });
      return user
    } catch(err) {
      addToast({
        type: 'error',
        title: 'Erro ao realizar login.',
        description:
          'Verifique suas credenciais.',
      })
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Safety:token');
    localStorage.removeItem('@Safety:user');
    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@Safety:user', JSON.stringify(user));
      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        token: data.token,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be within an AuthProvider');
  }

  return context;
}
