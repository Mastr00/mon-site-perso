import { useLanguage } from '../context/LanguageContext';

export default function LanguageToggle() {
    const { locale, toggleLanguage } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
            aria-label="Toggle language"
        >
            <span className={`text-lg leading-none ${locale === 'fr' ? 'opacity-100' : 'opacity-40 grayscale'}`}>🇫🇷</span>
            <span className={`text-lg leading-none ${locale === 'en' ? 'opacity-100' : 'opacity-40 grayscale'}`}>🇬🇧</span>
        </button>
    );
}
