import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Home, AlertTriangle } from 'lucide-react';

export default function Custom404() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-cyber-50 dark:bg-cyber-950 flex flex-col items-center justify-center px-4 text-center bg-grid">
      {/* Glowing background orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyber-accent/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10"
      >
        {/* 404 number */}
        <h1 className="text-[120px] md:text-[180px] font-mono font-extrabold text-cyber-200 dark:text-cyber-800 leading-none select-none">
          404
        </h1>

        {/* Icon */}
        <div className="flex justify-center -mt-6 mb-6">
          <div className="p-4 bg-cyber-accent/10 border border-cyber-accent/30 rounded-full">
            <AlertTriangle size={32} className="text-cyber-accent" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold font-mono text-cyber-950 dark:text-cyber-100 mb-4">
          {t.notFound.title}
        </h2>

        {/* Subtitle */}
        <p className="text-cyber-500 dark:text-cyber-400 max-w-md mx-auto mb-10 leading-relaxed">
          {t.notFound.subtitle}
        </p>

        {/* CTA Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-cyber-cta text-white font-bold rounded-sm hover:bg-cyber-accent transition-colors duration-200"
        >
          <Home size={20} />
          {t.notFound.backHome}
        </Link>
      </motion.div>
    </div>
  );
}
