import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ContactRequest, ContactRequestStatus, Language, RegisteredUser, Review, ReviewStatus, UserRole } from '../types';
import { translate } from '../i18n';
import { reviews as reviewSeed } from '../data/reviews';

interface AuthUser {
  name: string;
  role: UserRole;
}

interface AppContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, values?: Record<string, string | number>) => string;
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
  contactRequests: ContactRequest[];
  addContactRequest: (request: Omit<ContactRequest, 'id' | 'date' | 'status' | 'solution'>) => void;
  updateContactRequest: (id: string, update: Partial<Pick<ContactRequest, 'status' | 'solution'>>) => void;
  registeredUsers: RegisteredUser[];
  registerUser: (user: Omit<RegisteredUser, 'id' | 'registrationDate' | 'status'>) => void;
  reviews: Review[];
  updateReview: (id: string, status: ReviewStatus) => void;
  adminLoggedIn: boolean;
  adminLogin: (identifier: string, password: string) => boolean;
  adminLogout: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = window.localStorage.getItem('agrilink-language');
    return saved === 'hi' || saved === 'mr' ? saved : 'en';
  });
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = window.localStorage.getItem('agrilink-user');
    if (!saved) return null;
    try {
      const parsed = JSON.parse(saved) as AuthUser;
      return parsed && (parsed.role === 'farmer' || parsed.role === 'buyer') ? parsed : null;
    } catch {
      return null;
    }
  });
  const [adminLoggedIn, setAdminLoggedIn] = useState(() => window.localStorage.getItem('agrilink-admin-session') === 'true');
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>(() => {
    const saved = window.localStorage.getItem('agrilink-contact-requests');
    if (!saved) return [];
    try {
      return JSON.parse(saved) as ContactRequest[];
    } catch {
      return [];
    }
  });
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>(() => {
    const saved = window.localStorage.getItem('agrilink-users');
    if (!saved) return [];
    try { return JSON.parse(saved) as RegisteredUser[]; } catch { return []; }
  });
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = window.localStorage.getItem('agrilink-reviews');
    if (!saved) return reviewSeed;
    try { return JSON.parse(saved) as Review[]; } catch { return reviewSeed; }
  });

  useEffect(() => {
    window.localStorage.setItem('agrilink-language', language);
  }, [language]);

  useEffect(() => {
    window.localStorage.setItem('agrilink-contact-requests', JSON.stringify(contactRequests));
  }, [contactRequests]);
  useEffect(() => { window.localStorage.setItem('agrilink-users', JSON.stringify(registeredUsers)); }, [registeredUsers]);
  useEffect(() => { window.localStorage.setItem('agrilink-reviews', JSON.stringify(reviews)); }, [reviews]);

  const login = (u: AuthUser) => {
    setUser(u);
    window.localStorage.setItem('agrilink-user', JSON.stringify(u));
  };
  const logout = () => {
    setUser(null);
    window.localStorage.removeItem('agrilink-user');
  };
  const addContactRequest = (request: Omit<ContactRequest, 'id' | 'date' | 'status' | 'solution'>) => {
    setContactRequests((current) => [
      ...current,
      { ...request, id: `contact-${Date.now()}`, date: new Date().toISOString(), status: 'Pending', solution: '' },
    ]);
  };
  const updateContactRequest = (id: string, update: Partial<Pick<ContactRequest, 'status' | 'solution'>>) => {
    setContactRequests((current) => current.map((request) => request.id === id ? { ...request, ...update } : request));
  };
  const registerUser = (newUser: Omit<RegisteredUser, 'id' | 'registrationDate' | 'status'>) => {
    setRegisteredUsers((current) => [...current, { ...newUser, id: `user-${Date.now()}`, registrationDate: new Date().toISOString(), status: 'Active' }]);
  };
  const updateReview = (id: string, status: ReviewStatus) => {
    setReviews((current) => current.map((review) => review.id === id ? { ...review, status } : review));
  };
  const adminLogin = (identifier: string, password: string) => {
    const valid = (identifier === 'admin' || identifier === 'admin@agrilink.com') && password === 'admin123';
    if (valid) {
      setAdminLoggedIn(true);
      window.localStorage.setItem('agrilink-admin-session', 'true');
    }
    return valid;
  };
  const adminLogout = () => {
    setAdminLoggedIn(false);
    window.localStorage.removeItem('agrilink-admin-session');
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, t: (key, values) => translate(language, key, values), user, login, logout, contactRequests, addContactRequest, updateContactRequest, registeredUsers, registerUser, reviews, updateReview, adminLoggedIn, adminLogin, adminLogout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
