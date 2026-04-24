import { useLanguage } from '../context/LanguageContext';

export default function LanguageToggle() {
  const { locale, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-100 dark:bg-cyber-800 hover:bg-cyber-200 dark:hover:bg-cyber-700 transition-colors border border-cyber-200 dark:border-cyber-700"
      aria-label="Toggle language"
    >
      <span
        className={`text-lg leading-none ${locale === 'fr' ? 'opacity-100' : 'opacity-40 grayscale'}`}
      >
        🇫🇷
      </span>
      <span
        className={`text-lg leading-none ${locale === 'en' ? 'opacity-100' : 'opacity-40 grayscale'}`}
      >
        🇬🇧
      </span>
    </button>
  );
}
