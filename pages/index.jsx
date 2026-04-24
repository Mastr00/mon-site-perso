import Link from 'next/link';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Zap, Mail, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import SkillsCarousel from '../components/SkillsCarousel';

export default function Home() {
  const { t, locale } = useLanguage();

  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedName, setDisplayedName] = useState('');
  const [phase, setPhase] = useState('init'); // 'init' | 'typing' | 'name' | 'done'

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayedTitle(t.home.heroTitle + ' ');
      setDisplayedName('Mehdi');
      setPhase('done');
      return;
    }

    // Check if the loader has already finished (e.g. returning visit in same session)
    const hasLoaded = sessionStorage.getItem('page_loaded');
    if (hasLoaded) {
      // Loader already done, start typing immediately
      setPhase('typing');
      return;
    }

    // Wait for loader to finish before starting typing animation
    const handleLoaderDone = () => {
      // Small delay after loader fade-out (400ms exit animation) so typing starts cleanly
      setTimeout(() => setPhase('typing'), 450);
    };

    window.addEventListener('loaderDone', handleLoaderDone);
    return () => window.removeEventListener('loaderDone', handleLoaderDone);
  }, [t.home.heroTitle]);

  useEffect(() => {
    if (phase === 'init') return;

    const fullText = t.home.heroTitle + ' ';
    const name = 'Mehdi';

    if (phase === 'typing') {
      if (displayedTitle.length < fullText.length) {
        const timer = setTimeout(() => {
          setDisplayedTitle(fullText.slice(0, displayedTitle.length + 1));
        }, 70);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setPhase('name'), 200);
        return () => clearTimeout(timer);
      }
    }

    if (phase === 'name') {
      if (displayedName.length < name.length) {
        const timer = setTimeout(() => {
          setDisplayedName(name.slice(0, displayedName.length + 1));
        }, 120);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setPhase('done');
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [displayedTitle, displayedName, phase, t.home.heroTitle]);

  return (
    <>
      <SEO
        title={`Mehdi – ${t.home.studentIn} ${t.home.role1}`}
        description={`Portfolio of Mehdi, student in electronics and cybersecurity.`}
      />

      <section className="bg-grid min-h-screen flex flex-col items-center justify-center text-center px-4 bg-cyber-50 dark:bg-cyber-950 overflow-hidden relative">
        {/* Animated circuit background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Floating code snippets */}
          <motion.div
            className="absolute top-[15%] left-[8%] text-cyber-400 dark:text-cyber-500 font-mono text-sm hidden lg:block opacity-5 dark:opacity-8 blur-[1px]"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          >
            {'{ IoT: true }'}
          </motion.div>
          <motion.div
            className="absolute top-[25%] right-[12%] text-cyber-400 dark:text-cyber-500 font-mono text-sm hidden lg:block opacity-5 dark:opacity-8 blur-[1px]"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            {'#include <esp32.h>'}
          </motion.div>
          <motion.div
            className="absolute bottom-[25%] left-[15%] text-cyber-400 dark:text-cyber-500 font-mono text-sm hidden lg:block opacity-5 dark:opacity-8 blur-[1px]"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          >
            {'sudo nmap -sV'}
          </motion.div>
          <motion.div
            className="absolute bottom-[30%] right-[8%] text-cyber-400 dark:text-cyber-500 font-mono text-sm hidden lg:block opacity-5 dark:opacity-8 blur-[1px]"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          >
            {'0x4F 0x6B'}
          </motion.div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
          <div className="mb-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-cyber-950 dark:text-cyber-100 font-mono font-semibold tracking-tight min-h-[1.2em]">
              {displayedTitle}
              <span className="text-cyber-accent">{displayedName}</span>
              <span className="inline-block w-[3px] h-[1em] bg-cyber-accent ml-[2px] align-text-bottom animate-[blink_0.8s_steps(2)_infinite] opacity-100"></span>
            </h1>
          </div>

          <motion.p
            className="hero-subtitle max-w-2xl mx-auto text-cyber-700 dark:text-cyber-400 font-sans mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={phase === 'done' ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {t.home.studentIn}{' '}
            <span className="text-cyber-500 dark:text-cyber-200">{t.home.role1}</span> &{' '}
            <span className="text-cyber-500 dark:text-cyber-200">{t.home.role2}</span>.
            <br className="hidden md:block" />
            {t.home.passion}{' '}
            <span className="text-cyber-500 dark:text-cyber-200">{t.home.iot}</span>,{' '}
            {t.home.embedded} {locale === 'fr' ? 'et' : 'and'}{' '}
            <span className="text-cyber-500 dark:text-cyber-200">{t.home.modernWeb}</span>.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={phase === 'done' ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          >
            <Link
              href="/portfolio"
              className="bg-cyber-cta text-cyber-100 rounded-sm px-6 py-3 hover:bg-cyber-accent hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 font-semibold font-sans"
            >
              <Zap size={20} />
              {t.home.heroBtn}
            </Link>
            <Link
              href="/contact"
              className="border-[1.5px] border-cyber-accent text-cyber-accent bg-transparent hover:bg-cyber-accent hover:text-cyber-950 rounded-sm px-6 py-3 transition-all duration-200 flex items-center justify-center gap-2 font-semibold font-sans"
            >
              <Mail size={20} />
              {t.home.contactBtn}
            </Link>
          </motion.div>

          {/* Skills Infinite Carousel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={phase === 'done' ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full mt-12"
          >
            <SkillsCarousel />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={phase === 'done' ? { y: [0, 8, 0], opacity: 1 } : { opacity: 0 }}
          transition={
            phase === 'done'
              ? {
                  y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                  opacity: { duration: 0.5 },
                }
              : {}
          }
        >
          <ChevronDown size={28} className="text-cyber-500/50" />
        </motion.div>
      </section>
    </>
  );
}
