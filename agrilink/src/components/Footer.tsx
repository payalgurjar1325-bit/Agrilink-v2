import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Footer() {
  const { t } = useApp();
  return (
    <footer className="border-t border-soil-100 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-field-700 text-white">
              <Sprout size={16} />
            </span>
            <span className="text-base font-bold text-soil-900">AgriLink</span>
          </div>
          <p className="mt-3 text-sm text-soil-900/60">
            {t('Helping farmers discover better markets and sell with confidence.')}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-soil-900">{t('Platform')}</h4>
          <ul className="mt-3 space-y-2 text-sm text-soil-900/60">
            <li><Link to="/market-prices" className="hover:text-field-700">{t('Market Prices')}</Link></li>
            <li><Link to="/compare-markets" className="hover:text-field-700">{t('Compare Markets')}</Link></li>
            <li><Link to="/marketplace" className="hover:text-field-700">{t('Marketplace')}</Link></li>
            <li><Link to="/sell-produce" className="hover:text-field-700">{t('Sell Produce')}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-soil-900">{t('Account')}</h4>
          <ul className="mt-3 space-y-2 text-sm text-soil-900/60">
            <li><Link to="/login" className="hover:text-field-700">{t('Login')}</Link></li>
            <li><Link to="/register" className="hover:text-field-700">{t('Register')}</Link></li>
            <li><Link to="/dashboard" className="hover:text-field-700">{t('Dashboard')}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-soil-900">{t('About')}</h4>
          <ul className="mt-3 space-y-2 text-sm text-soil-900/60">
            <li><Link to="/about" className="hover:text-field-700">About AgriLink</Link></li>
            <li>Smart India Hackathon Prototype</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-soil-100 py-5 text-center text-xs text-soil-900/40">
        © 2026 AgriLink. Built for Smart India Hackathon.
      </div>
    </footer>
  );
}
