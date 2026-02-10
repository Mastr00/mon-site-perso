import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark');

  // Initialize based on system preference or localStorage
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored) {
      setTheme(stored);
      if (stored === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('dark'); // Default to dark for neon theme
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 rounded-lg bg-[#1E293B] dark:bg-[#1E293B] text-slate-300 dark:text-slate-300 text-sm border border-neon-violet/30 hover:border-neon-cyan/50 hover:shadow-[0_0_10px_rgba(34,211,238,0.2)] transition-all duration-300"
    >
      {theme === 'light' ? '🌙 Sombre' : '☀️ Clair'}
    </button>
  );
}