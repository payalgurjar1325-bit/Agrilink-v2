import { Language } from '../types';
import { en, TranslationKey } from '../locales/en';
import { hi } from '../locales/hi';
import { mr } from '../locales/mr';

export const languageLabels: Record<Language, string> = {
  en: 'English',
  hi: 'हिन्दी',
  mr: 'मराठी',
};

const translations: Record<Language, Partial<Record<TranslationKey, string>>> = { en, hi, mr };

export function translate(language: Language, key: string, values?: Record<string, string | number>): string {
  let result = translations[language][key as TranslationKey] ?? key;
  Object.entries(values ?? {}).forEach(([name, value]) => {
    result = result.replace(`{{${name}}}`, String(value));
  });
  return result;
}