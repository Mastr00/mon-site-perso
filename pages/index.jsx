import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Zap, Mail, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import SkillsCarousel from '../components/SkillsCarousel';

// Typing animation hook
function useTypingEffect(text, speed = 80) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayed, done };
}

export default function Home() {
  const { t, locale } = useLanguage();
  const { displayed, done } = useTypingEffect('Mehdi', 120);

  return (
    <>
      <Head>
        <title>Mehdi – {t.home.studentIn} {t.home.role1}</title>
        <meta name="description" content="Portfolio of Mehdi, student in electronics and cybersecurity." />
      </Head>

      <section className="bg-grid min-h-screen flex flex-col items-center justify-center text-center px-4 bg-cyber-50 dark:bg-cyber-950 overflow-hidden relative">

        {/* Animated circuit background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Removed SVGs and Neon blobs for cleaner look */}

          {/* Floating code snippets */}
          <motion.div
            className="absolute top-[15%] left-[8%] text-cyber-400 dark:text-cyber-500 font-mono text-sm hidden lg:block opacity-5 dark:opacity-8 blur-[1px]"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          >
            {'{ IoT: true }'}
          </motion.div>
          <motion.div
            className="absolute top-[25%] right-[12%] text-cyber-400 dark:text-cyber-500 font-mono text-sm hidden lg:block opacity-5 dark:opacity-8 blur-[1px]"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            {'#include <esp32.h>'}
          </motion.div>
          <motion.div
            className="absolute bottom-[25%] left-[15%] text-cyber-400 dark:text-cyber-500 font-mono text-sm hidden lg:block opacity-5 dark:opacity-8 blur-[1px]"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            {'sudo nmap -sV'}
          </motion.div>
          <motion.div
            className="absolute bottom-[30%] right-[8%] text-cyber-400 dark:text-cyber-500 font-mono text-sm hidden lg:block opacity-5 dark:opacity-8 blur-[1px]"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          >
            {'0x4F 0x6B'}
          </motion.div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-cyber-950 dark:text-cyber-100 mb-4 font-mono font-semibold tracking-tight">
              {t.home.heroTitle}{' '}
              <span className="text-cyber-accent">
                {displayed}
                {!done && <span className="animate-pulse text-cyber-accent">|</span>}
              </span>
            </h1>
          </motion.div>

          <motion.p
            className="hero-subtitle max-w-2xl mx-auto text-cyber-700 dark:text-cyber-400 font-sans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {t.home.studentIn} <span className="text-cyber-500 dark:text-cyber-200">{t.home.role1}</span> & <span className="text-cyber-500 dark:text-cyber-200">{t.home.role2}</span>.
            <br className="hidden md:block" />
            {t.home.passion} <span className="text-cyber-500 dark:text-cyber-200">{t.home.iot}</span>, {t.home.embedded} {locale === 'fr' ? 'et' : 'and'} <span className="text-cyber-500 dark:text-cyber-200">{t.home.modernWeb}</span>.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <Link
              href="/portfolio"
              className="bg-cyber-cta text-cyber-100 rounded-lg px-6 py-3 hover:bg-cyber-accent hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 font-semibold font-sans"
            >
              <Zap size={20} />
              {t.home.heroBtn}
            </Link>
            <Link
              href="/contact"
              className="border-[1.5px] border-cyber-accent text-cyber-accent bg-transparent hover:bg-cyber-accent hover:text-cyber-950 rounded-lg px-6 py-3 transition-all duration-200 flex items-center justify-center gap-2 font-semibold font-sans"
            >
              <Mail size={20} />
              {t.home.contactBtn}
            </Link>
          </motion.div>
          
          {/* Skills Infinite Carousel */}
          <SkillsCarousel />
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={28} className="text-cyber-500/50" />
        </motion.div>

      </section>
    </>
  );
}