// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../helpers/axios';
import { message } from 'antd';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoadingAuth: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  

  useEffect(() => {
    
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    

    if (token && userStr) {
      try {
        const parsedUser = JSON.parse(userStr);
        setUser(parsedUser);
      } catch {
        setUser(null);
      }
    }
    setIsLoadingAuth(false);
    
  }, []);

  const login = (token: string, user: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const logout = async () => {
    messageApi
      .open({
        type: 'loading',
        content: 'Cerrando session..',
        duration: 1.5,
      })
  
    try {
      await api.post('/logout');
    } catch (e) {}
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <>
    {contextHolder}
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, logout, isLoadingAuth }}
    >
      {children}
    </AuthContext.Provider>
    </>
    
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
