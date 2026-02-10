import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Zap, Mail, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

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

      <section className="bg-grid min-h-screen flex flex-col items-center justify-center text-center px-4 bg-[#020617] overflow-hidden relative">

        {/* Animated circuit background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Neon glow blobs */}
          <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-neon-violet/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-[20%] right-[5%] w-96 h-96 bg-neon-magenta/15 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[10%] left-[40%] w-96 h-96 bg-neon-cyan/15 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

          {/* Circuit lines SVG overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuit" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <path d="M0 100 H80 M120 100 H200" stroke="#8B5CF6" strokeWidth="1" fill="none" />
                <path d="M100 0 V80 M100 120 V200" stroke="#22D3EE" strokeWidth="1" fill="none" />
                <circle cx="100" cy="100" r="4" fill="#8B5CF6" />
                <circle cx="0" cy="100" r="2" fill="#22D3EE" />
                <circle cx="200" cy="100" r="2" fill="#22D3EE" />
                <circle cx="100" cy="0" r="2" fill="#D946EF" />
                <circle cx="100" cy="200" r="2" fill="#D946EF" />
                <path d="M80 100 L100 80 L120 100 L100 120 Z" stroke="#D946EF" strokeWidth="0.5" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>

          {/* Floating code snippets */}
          <motion.div
            className="absolute top-[15%] left-[8%] text-neon-cyan/10 font-mono text-sm hidden lg:block"
            animate={{ y: [0, -15, 0], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            {'{ IoT: true }'}
          </motion.div>
          <motion.div
            className="absolute top-[25%] right-[12%] text-neon-violet/10 font-mono text-sm hidden lg:block"
            animate={{ y: [0, 12, 0], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            {'#include <esp32.h>'}
          </motion.div>
          <motion.div
            className="absolute bottom-[25%] left-[15%] text-neon-magenta/10 font-mono text-sm hidden lg:block"
            animate={{ y: [0, -10, 0], opacity: [0.05, 0.12, 0.05] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            {'sudo nmap -sV'}
          </motion.div>
          <motion.div
            className="absolute bottom-[30%] right-[8%] text-neon-cyan/10 font-mono text-sm hidden lg:block"
            animate={{ y: [0, 10, 0], opacity: [0.06, 0.14, 0.06] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          >
            {'0x4F 0x6B'}
          </motion.div>
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="hero-title text-white mb-4">
              {t.home.heroTitle}{' '}
              <span className="highlight">
                {displayed}
                {!done && <span className="animate-pulse text-neon-cyan">|</span>}
              </span>
            </h1>
          </motion.div>

          <motion.p
            className="hero-subtitle max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {t.home.studentIn} <span className="keyword-electronique">{t.home.role1}</span> & <span className="keyword-cyber">{t.home.role2}</span>.
            <br className="hidden md:block" />
            {t.home.passion} <span className="keyword-electronique">{t.home.iot}</span>, {t.home.embedded} {locale === 'fr' ? 'et' : 'and'} <span className="keyword-cyber">{t.home.modernWeb}</span>.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <Link
              href="/portfolio"
              className="btn-primary animate-pulse-glow flex items-center justify-center gap-2"
            >
              <Zap size={20} />
              {t.home.heroBtn}
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl font-semibold border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Mail size={20} />
              {t.home.contactBtn}
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={28} className="text-neon-violet/50" />
        </motion.div>

      </section>
    </>
  );
}