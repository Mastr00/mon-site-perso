import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { useState, useRef } from 'react';

export default function Footer() {
  const { t } = useLanguage();
  const [easterEggCount, setEasterEggCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEasterEgg = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const newCount = easterEggCount + 1;
    setEasterEggCount(newCount);

    if (newCount >= 6) {
      setShowEasterEgg(true);
      setEasterEggCount(0);
      setTimeout(() => setShowEasterEgg(false), 5000);
    } else {
      timeoutRef.current = setTimeout(() => setEasterEggCount(0), 2000);
    }
  };

  return (
    <>
      {/* Easter Egg Modal */}
      {showEasterEgg && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowEasterEgg(false)}
        >
          <div className="bg-cyber-800 border-2 border-cyber-accent p-8 rounded-xl text-cyber-50 text-center max-w-md animate-bounce shadow-[0_0_20px_rgba(56,189,248,0.3)]">
            <p className="text-6xl mb-4">🎉</p>
            <h2 className="text-2xl font-bold mb-2">{t.footer.easterEggTitle}</h2>
            <p className="text-cyber-400">{t.footer.easterEggText}</p>
            <p className="text-xs mt-4 opacity-60">{t.footer.easterEggClose}</p>
          </div>
        </div>
      )}

      <footer className="w-full bg-cyber-50 dark:bg-cyber-950 border-t border-cyber-200 dark:border-cyber-900 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Brand / Copyright */}
            <div className="text-center md:text-left">
              <Link href="/" className="text-xl font-extrabold font-mono text-cyber-accent">
                MMSA<span className="text-cyber-500">.app</span>
              </Link>
              <p className="text-sm text-cyber-500 mt-2">
                © {new Date().getFullYear()} {t.footer.rights}
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-6">
              <a
                href="https://github.com/Mastr00"
                target="_blank"
                rel="noreferrer"
                className="text-cyber-500 hover:text-cyber-accent transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/mehdi-mamdouh-8493162b3/"
                target="_blank"
                rel="noreferrer"
                className="text-cyber-500 hover:text-cyber-accent transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:mehdimamdouh20@gmail.com"
                className="text-cyber-500 hover:text-cyber-accent transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>

            {/* Made by + Easter Egg Trigger */}
            <div
              className="text-sm text-cyber-500 cursor-default select-none"
              onClick={handleEasterEgg}
            >
              {t.footer.by} <span className="font-mono font-medium text-cyber-accent">Mehdi</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
