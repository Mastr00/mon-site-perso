import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fr } from '../locales/fr';
import { en } from '../locales/en';
import type { Locale, LanguageContextValue } from '../types';

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('fr');

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale | null;
    if (savedLocale === 'fr' || savedLocale === 'en') {
      setLocale(savedLocale);
    }
  }, []);

  const t = locale === 'en' ? en : fr;

  const toggleLanguage = () => {
    const newLocale: Locale = locale === 'fr' ? 'en' : 'fr';
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
