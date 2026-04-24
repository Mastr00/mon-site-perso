export type Locale = 'fr' | 'en';

export type BilingualText = {
  fr: string;
  en: string;
};

export type Project = {
  id: string;
  title: BilingualText;
  desc: BilingualText;
  descShort: BilingualText;
  idea: BilingualText;
  challenges: BilingualText;
  solution: BilingualText;
  tags: string[];
  demo: string;
  repo: string;
  image: string;
  hardware: string[];
};

import type { fr } from '../locales/fr';
export type Translations = typeof fr;

export type LanguageContextValue = {
  locale: Locale;
  toggleLanguage: () => void;
  t: Translations;
};
