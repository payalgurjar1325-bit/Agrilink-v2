import React, { useEffect, useState } from 'react';
import { Palette } from 'lucide-react';

type ThemeName = 'green' | 'light-green' | 'light-yellow' | 'light-blue';

const themes: { name: ThemeName; color: string; label: string }[] = [
  { name: 'green', color: '#345F27', label: 'Default Green theme' },
  { name: 'light-green', color: '#76A86B', label: 'Light Green theme' },
  { name: 'light-yellow', color: '#B38A35', label: 'Light Yellow theme' },
  { name: 'light-blue', color: '#5B8FA8', label: 'Light Blue theme' },
];

export function ThemeSelector() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeName>(() => {
    const saved = window.localStorage.getItem('agrilink-theme');
    return themes.some((option) => option.name === saved) ? saved as ThemeName : 'green';
  });

  useEffect(() => {
    if (theme === 'green') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.dataset.theme = theme;
    }
    window.localStorage.setItem('agrilink-theme', theme);
  }, [theme]);

  return (
    <div className="fixed right-3 top-1/2 z-[100] -translate-y-1/2">
      <div className="relative">
        {open && (
          <div className="absolute right-12 top-1/2 flex -translate-y-1/2 items-center gap-2 rounded-card border border-soil-100 bg-white p-2 shadow-card">
            {themes.map((option) => (
              <button
                key={option.name}
                type="button"
                aria-label={option.label}
                title={option.label}
                onClick={() => { setTheme(option.name); setOpen(false); }}
                className={`h-7 w-7 rounded-full border-2 ${theme === option.name ? 'border-soil-900' : 'border-white'}`}
                style={{ backgroundColor: option.color }}
              />
            ))}
          </div>
        )}
        <button
          type="button"
          aria-label="Choose color theme"
          title="Choose color theme"
          onClick={() => setOpen((current) => !current)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-soil-100 bg-white text-field-700 shadow-card hover:bg-field-50"
        >
          <Palette size={17} />
        </button>
      </div>
    </div>
  );
}