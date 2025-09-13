'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  isAuthenticated: boolean;
  userId: number | null;
  login: (token: string) => void;
  logout: () => void;
}

interface DecodedToken {
  user_id: number;
  exp: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        if (decoded.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
          setUserId(decoded.user_id);
        } else {
          // トークンが期限切れ
          Cookies.remove('token');
        }
      } catch (error) {
        console.error("Invalid token", error);
        Cookies.remove('token');
      }
    }
  }, []);

  const login = (token: string) => {
    Cookies.set('token', token, { expires: 1, secure: process.env.NODE_ENV === 'production' });
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setIsAuthenticated(true);
      setUserId(decoded.user_id);
    } catch (error) {
      console.error("Invalid token", error);
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
