import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Sprout, ChevronDown, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './Button';
import { languageLabels } from '../i18n';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/market-prices', label: 'Market Prices' },
  { to: '/compare-markets', label: 'Compare Markets' },
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/sell-produce', label: 'Sell Produce' },
  { to: '/about', label: 'About' },
  { to: '/testimonials', label: 'Reviews' },
  { to: '/contact', label: 'Contact Us' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { language, setLanguage, user, logout, t } = useApp();
  const navigate = useNavigate();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${isActive ? 'text-field-700' : 'text-soil-900/70 hover:text-field-700'}`;

  return (
    <header className="sticky top-0 z-40 border-b border-soil-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-field-700 text-white">
            <Sprout size={18} />
          </span>
          <span className="text-lg font-bold text-soil-900">AgriLink</span>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-2 lg:flex xl:gap-3">
              {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={`${linkClass} whitespace-nowrap`} end={l.to === '/'}>
              {t(l.label)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1 rounded-card border border-soil-100 px-3 py-2 text-sm text-soil-900/70 hover:bg-soil-50"
            >
              {languageLabels[language]} <ChevronDown size={14} />
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-1 w-32 overflow-hidden rounded-card border border-soil-100 bg-white shadow-card">
                <button
                  className="block w-full px-3 py-2 text-left text-sm hover:bg-field-50"
                  onClick={() => { setLanguage('en'); setLangOpen(false); }}
                >
                  English
                </button>
                <button
                  className="block w-full px-3 py-2 text-left text-sm hover:bg-field-50"
                  onClick={() => { setLanguage('hi'); setLangOpen(false); }}
                >
                  हिन्दी
                </button>
                <button
                  className="block w-full px-3 py-2 text-left text-sm hover:bg-field-50"
                  onClick={() => { setLanguage('mr'); setLangOpen(false); }}
                >
                  मराठी
                </button>
              </div>
            )}
          </div>

          {user ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-soil-900/70 hover:text-field-700">
                {t('Dashboard')}
              </Link>
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-field-100 text-field-700"
                aria-label="Profile"
                title="Log out"
              >
                <User size={16} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="secondary" size="sm">{t('Login')}</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">{t('Register')}</Button>
              </Link>
            </>
          )}
        </div>

        <button className="p-2 lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-soil-100 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-card px-3 py-3 text-[15px] font-medium ${isActive ? 'bg-field-50 text-field-700' : 'text-soil-900/80'}`
                }
              >
                {t(l.label)}
              </NavLink>
            ))}
          </nav>
          <div className="mt-3 flex items-center gap-2 border-t border-soil-100 pt-3">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : language === 'hi' ? 'mr' : 'en')}
              className="flex-1 rounded-card border border-soil-100 px-3 py-2.5 text-sm text-soil-900/70"
            >
              {languageLabels[language]}
            </button>
          </div>
          <div className="mt-3 flex gap-2">
            {user ? (
              <>
                <Link to="/dashboard" className="flex-1" onClick={() => setOpen(false)}>
                  <Button variant="secondary" fullWidth>{t('Dashboard')}</Button>
                </Link>
                <Button variant="danger" fullWidth onClick={() => { logout(); setOpen(false); navigate('/'); }}>
                  {t('Log out')}
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex-1" onClick={() => setOpen(false)}>
                  <Button variant="secondary" fullWidth>{t('Login')}</Button>
                </Link>
                <Link to="/register" className="flex-1" onClick={() => setOpen(false)}>
                  <Button variant="primary" fullWidth>{t('Register')}</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
