import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ServerCrash, RotateCcw } from 'lucide-react';

// Static 500 page — Next renders this for unhandled server errors. We can't
// rely on LanguageContext here because the global error path may bypass _app
// in some scenarios, so the copy is hardcoded bilingual-friendly.
export default function Custom500() {
  return (
    <div className="min-h-screen bg-cyber-50 dark:bg-cyber-950 flex flex-col items-center justify-center px-4 text-center bg-grid">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10"
      >
        <h1 className="text-[120px] md:text-[180px] font-mono font-extrabold text-cyber-200 dark:text-cyber-800 leading-none select-none">
          500
        </h1>

        <div className="flex justify-center -mt-6 mb-6">
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-full">
            <ServerCrash size={32} className="text-red-500" />
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold font-mono text-cyber-950 dark:text-cyber-100 mb-4">
          Une erreur serveur est survenue
        </h2>

        <p className="text-cyber-500 dark:text-cyber-400 max-w-md mx-auto mb-10 leading-relaxed">
          Quelque chose a planté côté serveur. Réessaie dans un instant — si ça persiste, c&apos;est
          probablement un bug et je serai notifié.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyber-cta text-white font-bold rounded-sm hover:bg-cyber-accent transition-colors duration-200"
          >
            <RotateCcw size={20} />
            Réessayer
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyber-50 dark:bg-cyber-900 border border-cyber-200 dark:border-cyber-800 text-cyber-950 dark:text-cyber-100 font-bold rounded-sm hover:border-cyber-accent/50 transition-colors duration-200"
          >
            <Home size={20} />
            Accueil
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
