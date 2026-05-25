import { createContext, useCallback, useState } from 'react';
import type { User, UserRole } from '../types';

const TOKEN_KEY = 'barberscheduler_token';
const USER_KEY = 'barberscheduler_user';

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setSession: (token: string, user: User) => void;
  logout: () => void;
  redirectPathForRole: (role: UserRole) => string;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  });

  const setSession = useCallback((newToken: string, newUser: User) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  function redirectPathForRole(role: UserRole): string {
    if (role === 'BARBER') return '/barber';
    if (role === 'ADMIN') return '/admin';
    return '/app';
  }

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated: !!token, setSession, logout, redirectPathForRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}
