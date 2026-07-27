"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage on mount
    const storedAuth = localStorage.getItem('auth_token');
    if (storedAuth === 'valid_mock_token') {
      setUser({
        id: 'u-1',
        name: 'Demo Admin',
        email: 'admin@student.com',
        role: 'admin'
      });
    }
    setIsLoading(false);
  }, []);

  const login = () => {
    localStorage.setItem('auth_token', 'valid_mock_token');
    setUser({
      id: 'u-1',
      name: 'Demo Admin',
      email: 'admin@student.com',
      role: 'admin'
    });
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  if (isLoading) {
    return null; // or a tiny loading spinner if preferred
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
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
