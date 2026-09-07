import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, UserRole } from '../types';

interface AuthUser {
  name: string;
  role: UserRole;
}

interface AppContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (u: AuthUser) => setUser(u);
  const logout = () => setUser(null);

  return (
    <AppContext.Provider value={{ language, setLanguage, user, login, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
